import threading

from app.backend import socketio
from app.backend.device import device

thread = None
tl = threading.local()


def start_send_system_info():
    global thread
    if thread is None:
        tl.active = True
        thread = socketio.start_background_task(target=background_thread)


def background_thread():
    while tl.active:
        # refresh interval
        socketio.sleep(1)
        socketio.emit('system_monitor', device.generate_system_info())


@socketio.on('connect')
def test_connect():
    print('client connected')
    start_send_system_info()


@socketio.on('disconnect')
def test_disconnect():
    print('client disconnected')
