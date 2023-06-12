import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ChatRoom from './components/chatroom';

function App() {
  return (
    // <Router>
    //   <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/chat">Chat Room</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     <Routes>
    //       <Route path="/chat">
    //         <ChatRoom room="general" />
    //       </Route>
    //       <Route path="/">
    //         <h1>Welcome to My Project</h1>
    //       </Route>
    //     </Routes>
    //   </div>
    // </Router>

    <ChatRoom room={'room'}/>
  );
}

export default App;
