import { FormEvent, useEffect, useState } from "react";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Filter from "bad-words";
import Cookies from "universal-cookie/es6";
const cookies = new Cookies();
interface msgType {
  deliverTime: object;
  msg: string;
  name: string;
  room: string;
  userID: string;
  id: string;
}


export const useChatroom = (room:string) => {
  const [msg, setMsg] = useState("");
  const [messeges, setMesseges] = useState<msgType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const colRef = collection(db, "messeges");
  const [user] = useAuthState(auth);

const  hasLetters = (str:string) => /[A-Za-z]/.test(str);


    const handleChange = async (
      e: FormEvent<HTMLFormElement>,
      textareaRef: React.RefObject<HTMLTextAreaElement>
    ) => {
      e.preventDefault();
      if (!msg) return;
        setMsg("");
        let filteredMsg;
        if (hasLetters(msg)) {
            let filter = new Filter();
          filteredMsg = filter.clean(msg);
        } else {
            filteredMsg = msg;
        }
      await addDoc(colRef, {
        userID: user?.uid,
        name: user?.displayName,
        deliverTime: serverTimestamp(),
        room,
        msg: filteredMsg,
      });
      if (textareaRef.current) {
        textareaRef.current.scrollTop = textareaRef.current.scrollHeight;
      }
    };

      useEffect(() => {
        const msgQuery = query(
          colRef,
          where("room", "==", room),
          orderBy("deliverTime")
        );
        const unsubscribe = onSnapshot(msgQuery, (snapshot) => {
          let messeges: msgType[] = [];
          snapshot.forEach((doc) => {
            // console.log(doc.data())
            const { deliverTime, msg, name, room, userID } = doc.data();
            const id = doc.id;
            messeges.push({ deliverTime, msg, name, room, userID, id });
          });
          setMesseges(messeges);
        });
        // this.scrollToBottom();

        return () => unsubscribe();
      }, []);

      useEffect(() => {
        if (messeges.length == 0) {
          setTimeout(() => {
            setIsLoading(false);
          }, 5000);
        }
      }, [messeges]);
    return {messeges,isLoading,msg,handleChange,setMsg}
}