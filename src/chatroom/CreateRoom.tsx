import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import Auth from './Auth';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
interface propType {
  userAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}
export default function CreateRoom(props: propType) {
    const { userAuth , setIsAuth} = props;
    const colRef = collection(db, "chatroom");
    const [user] = useAuthState(auth);
    const roomID = useRef("");
    const addRoom = async () => {
        if (roomID.current === "" || roomID.current === null) return;
        const room = roomID?.current + '-' + crypto.randomUUID().slice(0,3);
            try {
                await addDoc(colRef, {
                    userId: user?.uid,
                    room: room

                })
                console.log('room created!')
            } catch (e) {
                console.log('Error')
            }
        
    }
   
    return (
        userAuth ? (
        <>
            <input onChange={(e)=> roomID.current = e.target.value } placeholder='Create room...' />
            <button onClick={addRoom}>Create</button>
            </>
        ):
            <Auth setIsAuth={setIsAuth} />

    )
    
}
