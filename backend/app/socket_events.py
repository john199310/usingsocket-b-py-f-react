from app import socketio

@socketio.on('join_room')
def handle_join_room(data):
    room = data['room']
    socketio.join_room(room)
    socketio.emit('user_joined', data, room=room)

@socketio.on('leave_room')
def handle_leave_room(data):
    room = data['room']
    socketio.leave_room(room)
    socketio.emit('user_left', data, room=room)

@socketio.on('send_message')
def handle_send_message(data):
    room = data['room']
    socketio.emit('receive_message', data, room=room)
