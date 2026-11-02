from ..ld import ld_client, ld_context
from .loyalty import loyalty_discount


def order_total(order):
    total = round(sum(line.price * line.qty for line in order.lines), 2)
    if ld_client.variation("loyalty-points", ld_context(), False):
        total = round(total - loyalty_discount(order), 2)
    return total
