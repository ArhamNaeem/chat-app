import React, { useEffect, useRef, useState } from 'react'
import { getDocs, collection, query,where } from 'firebase/firestore'
import { db } from '../config/firebase'
interface type{
    room: string;
    userId: string;
}
export default function OnlineChatrooms() {
    const colRef = collection(db, 'chatroom');
    const [onlineRooms,setOnlineRooms]= useState<type[]>([])
    const getOnlineRooms =async ()=>{
      //to get all the chatrooms
        const fetchQuery = query(colRef, where('room', '!=', null));
        const document = await getDocs(fetchQuery);
        const newData = document.docs.map((doc) => {
            return {
                room: doc.data().room,
                userId: doc.data().userId
            }
        })
        // console.log(newData,onlineRooms)
        if (JSON.stringify(onlineRooms) !== JSON.stringify([...newData])) {
            setOnlineRooms([...newData])
        }
    }

    

useEffect(() => {
  getOnlineRooms()

  
}, [onlineRooms])
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const hideScroll = () => {
      textareaRef.current?.classList.toggle('overflow-hidden')
    }

  return (
    <>
      <div className=" mr-5 mt-10 h-4/5 text-white  shadow-lg shadow-black w-2/5 text-center ">
        <p className=" m-auto text-2xl  border-white w-4/5 font-semibold mb-5">
          Online Rooms
        </p>
     
        {onlineRooms.length == 0 ? (
          <div className="text-xl mt-20 font-semibold">Loading...</div>
        ) : (
          <textarea
            className="mt-2 overflow-hidden bg-transparent h-4/5 text-lg text-center w-full t p-2 resize-none  outline-none scrollbar-track-rounded-xl"
            ref={textareaRef}
            readOnly
            value={onlineRooms
              .map((room) => `Room ID: ${room.room}\n\n`)
              .join("")}
            onClick={hideScroll}
          />
        )}
      </div>
    </>
  );
}
