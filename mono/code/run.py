#!/usr/bin/env python
import eventlet
eventlet.patcher.monkey_patch(all=False, socket=True, time=True,
                          select=True, thread=True, os=True)

from pyapp.server import serve
serve()
