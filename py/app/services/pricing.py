def order_total(order):
    return round(sum(line.price * line.qty for line in order.lines), 2)
