import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Auth from './Auth';
import { db } from '../config/firebase';
import { auth } from '../config/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
interface propType {
  userAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

export default function CreateRoom(props: propType) {
    const { userAuth , setIsAuth} = props;
    const colRef = collection(db, "chatroom");
    const [user] = useAuthState(auth);
  const roomID = useRef("");
  const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [statement, setStatement] = useState("");
    const addRoom = async () => {
      if (roomID.current === "" || roomID.current === null) {
              setStatement(`Please enter room id`);
              setShowPopup(true);
        return;
      }
      const room = roomID?.current + '-' + crypto.randomUUID().slice(0, 3);
         setStatement(`Creating room...`);
         setShowPopup(true);
            try {
                await addDoc(colRef, {
                    userId: user?.uid,
                    room

                })
                navigate("/chat-room", { state: room });
              
            } catch (e) {
         setStatement(`Error occurred`);

                // console.log('Error')
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
        <div className="text-slate-200 w-full h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
          <h1 className="py-10  text-center text-3xl md:text-5xl font-semibold">
            Create your own chatroom!
          </h1>
          <div className="h-1/2 md:mt-4 flex flex-col items-center justify-center">
            <input
              className="text-lg h-10 w-4/5
              md:w-1/2 mb-5 bg-transparent outline-none mt-12 p-10 rounded-lg border focus:border-slate-600"
              onChange={(e) => (roomID.current = e.target.value)}
              placeholder="Enter room id"
            />
            <button
              className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 md:w-2/5 h-1/4 text-xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
              onClick={addRoom}
            >
              Create room
            </button>
          </div>
        </div>
      </>
    ) : (
      <Auth setIsAuth={setIsAuth} />
    );
    
}
