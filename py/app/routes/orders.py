from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.tracking import tracking_for

from ..db import db
from ..ld import ld_client, ld_context
from ..services.pricing import order_total

router = APIRouter()


class Order(BaseModel):
    id: str
    total: float
    status: str


@router.get("/v1/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find(order_id)
    if order is None:
        raise HTTPException(status_code=404)
    body = {"id": order.id, "total": order_total(order), "status": order.status}
    if ld_client.variation("order-tracking", ld_context(), False):
        body["tracking"] = await tracking_for(order.id)
    return body
