import React, { createRef, FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation , useNavigate} from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import { db,auth } from '../config/firebase';
interface propType{
  roomID: string;
}

interface msgType{
  deliverTime: object;
  msg: string;
  name: string;
  room: string;
  userID: string;
  id: string;
}

export default function Chatroom(props: propType) {
  const [user] = useAuthState(auth);
  //props being sent via useNavigate(state:{props})
  const location = useLocation();
  const room = location.state;
  const navigate = useNavigate();
  let textareaRef = useRef<HTMLTextAreaElement>(null);
  const [msg, setMsg] = useState("");
  const [messeges, setMesseges] = useState<msgType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colRef = collection(db, "messeges");
  const handleChange = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!msg) return;
    setMsg("");
   
    await addDoc(colRef, {
      userID: user?.uid,
      name: user?.displayName,
      deliverTime: serverTimestamp(),
      room,
      msg,
    });
     if (textareaRef.current) {
       textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
     }
  };
  const goToHome = () => {
    navigate("/");
  };

  useEffect(() => {
    
    const msgQuery = query(colRef, where("room", '==', room),orderBy("deliverTime"));
    const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
      let messeges: msgType[] = [];
      snapshot.forEach((doc) => {
        // console.log(doc.data())
        const { deliverTime, msg, name, room, userID } = doc.data();
        const id = doc.id;
        messeges.push({ deliverTime, msg, name, room, userID, id });
      })
      setMesseges(messeges);
    });
      // this.scrollToBottom();
   
    return () => 
      unsubscribe();

  }, [])


  useEffect(() => {
    if (messeges.length == 0) {
     setTimeout(() => {
       setIsLoading(false);
     }, 5000);
   }
  }, [messeges])
  
  
  
  return (
    <>
      <div
        className="text-slate-200
        w-full
        p-2
        h-screen
        bg-gradient-to-bl
        from-slate-800
        via-gray-800
        to-slate-900"
      >
        <div className="flex justify-around">
          <h1 className="text-3xl inline font-semibold my-3">
            Room id: {room}
          </h1>
          <button
          onClick={goToHome}
            className="border border-slate-700 w-20 h-10 my-2 rounded-lg shadow-black shadow-lg active:text-slate-400">
            Home
          </button>
        </div>
        {messeges.length == 0 ?
          (
          <div className="w-full text-3xl h-4/5 resize-none font-semibold  outline-none bg-transparent scroll-smooth text-center pt-32">
              {isLoading ? 'Loading...' :
                'No messeges yet..'
         
        }
          </div>
        ) : (
          <textarea
            className="w-full rounded-lg border border-slate-700 p-4 text-xl h-4/5 resize-none t outline-none bg-transparent scroll-smooth"
            readOnly
            ref={textareaRef}
            value={messeges
              .map((msg, index) => {
                let lineBreak = "\n\n";
                if (index === messeges.length - 1) {
                  lineBreak = "";
                }
                return `${msg.name} : ${msg.msg}${lineBreak}`;
              })
              .join("")}
          />
        )}
        <form onSubmit={handleChange}>
          <input
            className="w-5/6  outline-none bg-slate-800 h-9 p-5 border border-slate-500 rounded-lg  focus:border-slate-700 mx-4"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            placeholder="Enter text..."
          />
          <button className="text-lg  active:text-slate-400" type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  );
}
