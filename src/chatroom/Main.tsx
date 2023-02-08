import React, { useState } from 'react'
import EnterChat from './EnterChat'
import CreateRoom from './CreateRoom';
import OnlineChatrooms from './OnlineChatrooms';
import Cookies from 'universal-cookie/es6';
const cookies = new Cookies();
export default function Main() {
  const [isAuth, setIsAuth] = useState<boolean>(cookies.get("auth-token"));
  return (
    <>
      {/* <button onClick={() => <CreateRoom />}>Create room</button> */}
      {/* <button>Enter chat</button> */}
      {/* <CreateRoom userAuth={isAuth} setIsAuth={setIsAuth} /> */}
      <EnterChat userAuth={isAuth} setIsAuth={setIsAuth} />
      {/* <OnlineChatrooms/> */}
    </>
  );
}
