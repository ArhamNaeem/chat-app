import React from 'react'
import { useLocation } from 'react-router-dom';


interface propType{
  roomID: string;
}

export default function Chatroom(props: propType) {
  //props being sent via useNavigate(state:{props})
  const location = useLocation();
  const propsFromNavigation = location.state;
    return (
    <>
        
        {(propsFromNavigation)}
    </>
  )
}
