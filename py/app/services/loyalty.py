def loyalty_discount(order):
    return min(order.customer.points / 100, 10)
