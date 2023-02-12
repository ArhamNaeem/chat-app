import  {useRef, useState } from 'react'
import { useOnlineChatrooms } from '../custom-hooks/useOnlineChatrooms'
interface type{
    room: string;
    userId: string;
}
export default function OnlineChatrooms() {
const textareaRef = useRef<HTMLTextAreaElement>(null);
const [onlineRooms, setOnlineRooms] = useState<type[]>([]);
  const { toggleScroll } = useOnlineChatrooms(onlineRooms, setOnlineRooms, textareaRef.current);
  
  return (
    <>
      <div className="md:mt-18 mr-5 mt-10 h-4/5 text-white  shadow-lg shadow-black w-2/5 text-center ">
        <p className=" m-auto text-2xl  border-white w-4/5 font-semibold mb-5">
          Online Rooms
        </p>
     
        {onlineRooms.length == 0 ? (
          <div className="text-xl mt-20 font-semibold">Loading...</div>
        ) : (
          <textarea
            className="mt-2 overflow-hidden bg-transparent h-4/5 text-lg text-center w-full t p-2 resize-none  outline-none scrollbar-track-rounded-xl"
            ref={textareaRef}
            readOnly
            value={onlineRooms
              .map((room) => `Room ID: ${room.room}\n\n`)
              .join("")}
            onClick={toggleScroll}
          />
        )}
      </div>
    </>
  );
}
