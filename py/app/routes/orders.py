from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..db import db
from ..services.fees import service_fee
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
    return {"id": order.id, "total": order_total(order) + service_fee(order), "status": order.status}
