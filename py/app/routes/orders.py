from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from ..db import db
from ..services.pricing import order_total

router = APIRouter()


class Order(BaseModel):
    id: str
    total: float
    status: str
    gift_note: str | None = None


@router.get("/v1/orders/{order_id}")
async def get_order(order_id: str):
    order = await db.orders.find(order_id)
    if order is None:
        raise HTTPException(status_code=404)
    return {"id": order.id, "total": order_total(order), "status": order.status}


@router.get("/v2/orders")
async def list_orders_v2(cursor: str | None = None):
    page = await db.orders.page(cursor=cursor)
    return {"data": [serialize(o) for o in page.items], "cursor": page.next}


def serialize(order):
    return {"id": order.id, "total": order_total(order), "status": order.status}
