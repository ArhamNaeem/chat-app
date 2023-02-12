import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import Chatroom from './Chatroom';
import { db } from '../config/firebase'
import { useContext } from 'react';
import { AuthContext } from '../App';
import {useNavigate} from 'react-router-dom'
import { collection, getDocs, query,where } from 'firebase/firestore'
import Auth from './Auth';
import OnlineChatrooms from './OnlineChatrooms';

export default function EnterChat() {
  const userAuth = useContext(AuthContext)?.userAuth;
  // const setUserAuth = useContext(AuthContext)?.setUserAuth;

    const colRef = collection(db, 'chatroom');
  const room = useRef("");
  const [showPopup, setShowPopup] = useState(false);
  const [statement, setStatement] = useState("");

  const navigate = useNavigate();
    const validate = async() => {
      if (room.current === "") {
           setStatement(`Please enter room id`);
        setShowPopup(true);
        return;
      }
        try {
            const docQuery = query(colRef, where('room', '==', room.current));
            const doc =await getDocs(docQuery);
            if (doc.empty) {
              setStatement(`No such room with id ${room.current} exist`)
              setShowPopup(true)
                console.log('error, room doesnt exist')
          
            } else {
              navigate('/chat-room', { state: room.current })
            }
        } catch (e) {
              setStatement(`Error occurred`);
              setShowPopup(true);
            // console.log(e);
         }
  }
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }, [showPopup]);
  

    return userAuth ? (
      <>
        <div
          className={`fixed top-0 left-0 right-0 py-4 px-4 bg-slate-800 border border-slate-600 border-t-0 text-white text-center  ${
            showPopup ? "block" : "hidden"
          }`}
        >
          {statement}
        </div>
        <div className="flex text-slate-200 h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
          <div className="mt-10 w-4/6">
            <h1 className="py-10 text-center text-3xl font-semibold">
              Enter chatroom
            </h1>
            <div className="h-1/2 flex flex-col items-center justify-center">
              <input
                className="text-lg h-10 w-4/5 mb-5 bg-transparent outline-none mt-12 p-10 rounded-lg border focus:border-slate-600"
                onChange={(e) => (room.current = e.target.value)}
                type="text"
                placeholder="Enter room id"
              />
              <button
                className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 h-1/4 text-xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
                onClick={validate}
              >
                Enter chat
              </button>
            </div>
          </div>
          <OnlineChatrooms />
        </div>
      </>
    ) : (
      <Auth/>
    );
}