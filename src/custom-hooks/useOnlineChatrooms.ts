import { Dispatch, useEffect, useState } from "react";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
interface type{
    room: string;
    userId: string;
}
export const useOnlineChatrooms = (
  onlineRooms: type[],
  setOnlineRooms: Dispatch<React.SetStateAction<type[]>>,
  textareaRef: HTMLTextAreaElement | null
) => {
  const colRef = collection(db, "chatroom");

  const getOnlineRooms = async () => {
    //to get all the chatrooms
    const fetchQuery = query(colRef, where("room", "!=", null));
    const document = await getDocs(fetchQuery);
    const newData = document.docs.map((doc) => {
      return {
        room: doc.data().room,
        userId: doc.data().userId,
      };
    });
    if (JSON.stringify(onlineRooms) !== JSON.stringify([...newData])) {
      setOnlineRooms([...newData]);
    }
  };

  const toggleScroll = () => {
    if (textareaRef) {
      textareaRef.classList.toggle("overflow-hidden");
    }
  };

  const effect = useEffect(() => {
    getOnlineRooms();
  }, [onlineRooms]);

  return { toggleScroll, effect };
};
