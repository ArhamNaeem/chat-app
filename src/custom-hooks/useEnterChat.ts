import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
export const useEnterChat = () => {
const [showPopup, setShowPopup] = useState(false);
const [statement, setStatement] = useState("");
  const navigate = useNavigate();
  const colRef = collection(db, "chatroom");

  const validate = async (room:string) => {
    if (room === "") {
      setStatement(`Please enter room id`);
      setShowPopup(true);
      return;
    }
    try {
      const docQuery = query(colRef, where("room", "==", room));
      const doc = await getDocs(docQuery);
      if (doc.empty) {
        setStatement(`No such room with id ${room} exist`);
        setShowPopup(true);
        console.log("error, room doesnt exist");
      } else {
        navigate("/chat-room", { state: room });
      }
    } catch (e) {
      setStatement(`Error occurred`);
      setShowPopup(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }, [showPopup]);

  return { validate,showPopup,statement };
};
