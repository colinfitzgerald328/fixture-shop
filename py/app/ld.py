import ldclient
from ldclient import Context

ld_client = ldclient.get()


def ld_context():
    return Context.builder("anonymous").anonymous(True).build()
