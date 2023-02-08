import React, { Dispatch, SetStateAction, useRef, useState } from 'react'
import Chatroom from './Chatroom';
import { db } from '../config/firebase'
import { collection, getDocs, query,where } from 'firebase/firestore'
import Auth from './Auth';
    interface propType {
      userAuth: boolean;
      setIsAuth: Dispatch<SetStateAction<boolean>>;
    }
export default function EnterChat(props:propType) {
    const { userAuth, setIsAuth } = props;
    const [isRoom, setIsRoom] = useState(false);
    const colRef = collection(db, 'chatroom');
    const room = useRef("");

    const validate = async() => {
        // console.log(room.current);
        try {
            const docQuery = query(colRef, where('room', '==', room.current));
            const doc =await getDocs(docQuery);
            if (doc.empty) {
                console.log('error, room doesnt exist')
                setIsRoom(false);
            } else {
                setIsRoom(true);
            }
        } catch (e) {
            console.log(e);
         }
    }

    return (
        userAuth?(
        <>
            <div>
                    <input
                        onChange={(e) => room.current = e.target.value}
                        type="text"
                        placeholder='Enter chatroom...' />
                <button onClick={validate}>
                    Enter chat
                    </button>
                    <Chatroom isRoom={isRoom} />
            </div>

        </>):<Auth setIsAuth={setIsAuth}/>
    )
}