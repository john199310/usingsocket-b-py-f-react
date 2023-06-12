import React, { useState, useEffect } from 'react';
import { useSocket } from '../socketContext';
import { Box, TextField, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Avatar } from '@mui/material';


const ChatRoomContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
});

const ChatRoomHeader = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#f5f5f5',
});

const ChatRoomMessages = styled(List)({
    flexGrow: 1,
    overflowY: 'auto',
});

// const ChatRoomMessage = styled(ListItem)({
//     display: 'flex',
//     flexDirection: 'column',
// });

const ChatRoomMessageText = styled(ListItemText)({
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
    padding: '8px',
    marginBottom: '8px',
});

const ChatRoomInput = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    backgroundColor: '#f5f5f5',
});

const ChatRoomMessage = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
});


function ChatRoom({ room }) {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');
    const socket = useSocket();
  
    useEffect(() => {
      socket.emit('join_room', { room });
  
      return () => {
        socket.emit('leave_room', { room });
      };
    }, [room, socket]);
  
    useEffect(() => {
      socket.on('receive_message', (data) => {
        setMessages((messages) => [...messages, data]);
      });
  
      return () => {
        socket.off('receive_message');
      };
    }, [socket]);
  
    const handleSendMessage = (event) => {
      event.preventDefault();
      if (message) {
        socket.emit('send_message', { room, message });
        setMessage('');
      }
    };
  
    return (
      <ChatRoomContainer>
        <ChatRoomHeader>
          <Typography variant="h6">Chat Room: {room}</Typography>
        </ChatRoomHeader>
        <ChatRoomMessages>
          {messages.map((message, index) => (
            <ChatRoomMessage key={index}>
              <ChatRoomMessageText primary={message.username} secondary={message.message} />
            </ChatRoomMessage>
          ))}
        </ChatRoomMessages>
        <ChatRoomInput component="form" onSubmit={handleSendMessage}>
          <TextField
            label="Message"
            variant="outlined"
            size="small"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" disabled={!message}>
            Send
          </Button>
        </ChatRoomInput>
      </ChatRoomContainer>
    );
  }
  

export default ChatRoom;
