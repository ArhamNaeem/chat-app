import React, { useEffect, useState } from 'react'
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

    

  return (
    <div>
      <textarea
        className="w-full p-2 h-96 resize-none  outline-none"
        readOnly
        value={onlineRooms
          .map(
            (room) =>
              `Room name: ${room.room}\n_________________________________________\n`
          )
          .join("")}
      />
    </div>
  );
}
