from app import create_app, socketio
from app.socket_events import *


app = create_app()

if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
