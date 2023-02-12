import React, { Dispatch, SetStateAction, useState } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Main() {
  const navigate = useNavigate();
  return (
    <>
      <div className="text-slate-200 w-full h-screen bg-gradient-to-bl from-slate-800 via-gray-800 to-slate-900">
        <h1 className="text-5xl font-semibold text-center  pt-5 md:translate-y-6 pb-2 w-1/2 m-auto">
          Sweet TEXTS
        </h1>
        <div className="h-4/5 flex flex-wrap justify-center items-center">
          <button
            className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 md:w-2/5 h-2/5 md:h-2/3 text-3xl md:text-5xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
            onClick={() => navigate("/create-room")}
          >
            Create room
          </button>
          <button
            className="rounded-lg shadow-lg shadow-black mx-4 w-1/2 md:w-2/5 h-2/5 md:h-2/3 text-3xl md:text-5xl mt-10 ease-linear transition-all duration-200  hover:scale-110"
            onClick={() => navigate("/enter-chat")}
          >
            Enter chat
          </button>
        </div>
      </div>
    </>
  );
}
