import React, { Dispatch, SetStateAction } from 'react'
import { db } from '../config/firebase'
import { collection, addDoc } from 'firebase/firestore'
import Auth from './Auth';
    interface propType {
      userAuth: boolean;
      setIsAuth: Dispatch<SetStateAction<boolean>>;
    }
export default function EnterChat(props:propType) {
    const { userAuth, setIsAuth } = props;
    return (
        userAuth?(
        <>
            <div>
                <input type="text" placeholder='Enter chatroom...' />
                <button>
                    Enter chat
                </button>
            </div>

        </>):<Auth setIsAuth={setIsAuth}/>
    )
}