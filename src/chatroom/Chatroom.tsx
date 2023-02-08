import React from 'react'


interface propType{
    isRoom: boolean;
}

export default function Chatroom(props: propType) {
    const { isRoom } = props;
    return isRoom?
  (
    <>
      room
    </>
  ): <></>
}
