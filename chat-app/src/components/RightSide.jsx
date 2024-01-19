import "./ChatBox.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BaseURL } from "../redux/api/baseApi";
import { FaCircleUser } from "react-icons/fa6";
// import { RiSendPlaneFill } from "react-icons/ri";
import InputEmoji from "react-input-emoji";
// import { format } from "timeago.js";
import { useGetMessageQuery } from "../redux/message/messageApi";


const RightSide = (currentChat) => {
  //  const [sendMessage] = useSendMessageMutation();
    const chat= currentChat?.currentChat
    const { user } = useSelector((state) => state.auth) || {};
    const [userData,setUserData] = useState(null)
     const userId = currentChat?.currentChat?.members.find((id)=>id!==user?.userId)
   
   useEffect(()=>{
     const getUserData = async () => {
        const {data } = await axios.get(`${BaseURL}/api/v1/user/${userId}`)
         //  const {data } = await axios.get(`http://localhost:9000/api/v1/user/${userId}`) 
        setUserData(data)
     }
     if(currentChat?.currentChat !== null) getUserData()
   },[userId,currentChat])
  //   console.log("userData:",userData)
  //================ message data query====================
  const {data} = useGetMessageQuery(chat)
// console.log("messages:",data)
// console.log("chat?._id:",chat?._id)
// console.log("user?.userId:",user?.userId)
// console.log("Others Reciver:",userId)
//============send message handler================
const [text, setText] = useState("");

const handleOnEnter = async () => {
    const data ={
        chatId:userId,
        senderId:user?.userId,
        text:text
    }
// console.log("enter text", data);
 axios.post(`${BaseURL}/api/v1/message`,data)
}
// function SendMessage (text){
//     const data ={
//         chatId:userId,
//         senderId:user?.userId,
//         text:text
//     }
//   console.log("SendMessage text", data);
// }
  return (
    <>
    {
        currentChat?.currentChat ? <>
        <div>
      {
        userData && <>
        <div className={` " flex flex-row items-center hover:bg-blue-200 duration-300 py-2 rounded"`}> 
        <FaCircleUser size={24} />
        <div className=" flex flex-col mx-2 ">
        <span className=" font-semibold  ">{userData?.name} </span>
        <span className=" text-blue-700 -mt-2 text-sm ">Online</span>
        </div>       
        </div>
     <hr className=" h-[1.5px] bg-black mx-4 " />
        </>
     
      }
      {/* ================= chatBox Messages Start ============ */}
      <div>
        {data?.map((message,index)=>(
            <div key={index}>
                <div className=" flex justify-between w-full ">
                 
                {message.senderId === user?.userId && <p className={`${message.senderId !== user?.userId ? " opacity-0 " :""} bg-blue-500 text-white p-2 rounded-md mt-2`}>{message?.text}{message?.senderId} </p>}
                {message.senderId === user?.userId && <p className="bg-blue-500 text-white p-2 rounded-md mt-2">{message?.text} </p>}
                </div>
       
            </div>
        ))}
      </div>
      {/* ================= chatBox Message end ============ */}
      {/* =================  Message sender start ============ */}
<div className=" flex items-center w-full ">
    <div className=" w-10 h-10 rounded-full bg-black text-white flex items-center justify-center text-center text-3xl font-semibold p-2  ">+</div>
<div className=" w-full "><InputEmoji 
value={text}
onChange={setText}
cleanOnEnter
onEnter={handleOnEnter}
placeholder="Type a message"
/></div> 
<div  className="flex items-center justify-center w-16 h-10 px-3 rounded-md bg-black text-white font-semibold ">Send</div>
</div>
      {/* =================  Message sender end ============ */}
      

    </div>
        </> : <span> Tap on a Chat to start Conversation </span>
    }
    </>
  )
}

export default RightSide
/*

className={
                      message.senderId === user?.userId
                        ? "message own"
                        : "message"
                    }
*/