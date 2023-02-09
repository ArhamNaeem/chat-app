import { useState } from 'react'
import Main from './chatroom/Main'
import { BrowserRouter as Router, Route, Routes, To } from 'react-router-dom'
import './App.css'
import CreateRoom from './chatroom/CreateRoom';
import Cookies from "universal-cookie/es6";
import EnterChat from './chatroom/EnterChat';
import Chatroom from './chatroom/Chatroom';
const cookies = new Cookies();

function App() {

  const [userAuth, setUserAuth] = useState<boolean>(cookies.get("auth-token"));

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/create-room"
            element={<CreateRoom userAuth={userAuth} setIsAuth={setUserAuth} />}
          />
          <Route
            path="/enter-chat"
            element={<EnterChat userAuth={userAuth} setIsAuth={setUserAuth} />}
          />
          <Route path="/chat-room" element={<Chatroom roomID=""/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App
