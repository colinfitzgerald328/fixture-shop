SERVICE_FEE = 1.5


def service_fee(order):
    return SERVICE_FEE if order.total < 25 else 0
