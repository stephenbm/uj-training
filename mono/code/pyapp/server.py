#!/usr/bin/env python

import eventlet
import eventlet.wsgi
from . import app


def serve():
    eventlet.wsgi.server(eventlet.listen(
        ('0.0.0.0', 5000)), app)

if __name__ == "__main__":
    serve()
