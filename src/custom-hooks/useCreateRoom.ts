import { useEffect, useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db ,auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";


export const useCreateRoom = () => {
      const [showPopup, setShowPopup] = useState(false);
    const [statement, setStatement] = useState("");
  const [user] = useAuthState(auth);

  const colRef = collection(db, "chatroom");
  const navigate = useNavigate();
    
      const addRoom = async (roomID: string) => {
        if (roomID === "") {
          setStatement(`Please enter room id`);
          setShowPopup(true);
          return;
        }
        const room = roomID + "-" + crypto.randomUUID().slice(0, 3);
        setStatement(`Creating room...`);
        setShowPopup(true);
        try {
          await addDoc(colRef, {
            userId: user?.uid,
            room,
          });
          navigate("/chat-room", { state: room });
        } catch (e) {
          setStatement(`Error occurred`);

          // console.log('Error')
        }
      };

    
  useEffect(() => {
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  }, [showPopup]);

    return {addRoom,statement,showPopup}
}