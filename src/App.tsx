import { useState,createContext, SetStateAction, Dispatch } from 'react'
import Main from './chatroom/Main'
import { BrowserRouter as Router, Route, Routes, To } from 'react-router-dom'
import CreateRoom from './chatroom/CreateRoom';
import Cookies from "universal-cookie/es6";
import EnterChat from './chatroom/EnterChat';
import Chatroom from './chatroom/Chatroom';
const cookies = new Cookies();

    interface type {
      userAuth: boolean;
      setUserAuth: Dispatch<SetStateAction<boolean>>;
    }
    
export const AuthContext = createContext < type|null>(null);

function App() {
  const [userAuth, setUserAuth] = useState<boolean>(cookies.get("auth-token"));

  return (
    <>
      <AuthContext.Provider value = {{userAuth,setUserAuth}}>
        <Router>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route
              path="/create-room"
              element={
                <CreateRoom  />
              }
            />
            <Route
              path="/enter-chat"
              element={
                <EnterChat />
              }
            />
            <Route path="/chat-room" element={<Chatroom roomID="" />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App
