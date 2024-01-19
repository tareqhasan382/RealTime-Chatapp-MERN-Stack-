import TopBar from "./TopBar"
import  "./ChatStyle.css"
import Conversation from "./conversation/Conversation"
import Message from "./message/Message"
import InputEmoji from "react-input-emoji";
import { useEffect, useRef, useState } from "react";
import ChatOnline from "./chatOnline/ChatOnline";
import { useSelector } from "react-redux";
import { useGetChatQuery } from "../redux/chat/chatApi";
import { useGetMessageQuery, useSendMessageMutation } from "../redux/message/messageApi";
import  {io}  from "socket.io-client";
const Chat = () => {
  const scrollRef = useRef()
  const { user } = useSelector((state) => state.auth) || {};
  const {data} = useGetChatQuery(user)
  const [chats,setChats] = useState([]);
  const socket = useRef(io("ws://localhost:9000"))
  const [currentChat,setCurrentChat] = useState(null)
  const [socketMessage,setSocketMessage] = useState(null)
  const [message,setMessages] = useState(null)
  const [onlineUsers,setOnlineUsers] = useState([])
  const {data:messages} = useGetMessageQuery(currentChat?._id)

 useEffect(()=>{
  socket.current=io("ws://localhost:9000")
  setMessages(messages)
  socket.current.on("getMessage",getMessageData=>{
  //  console.log("getMessage socket:",getMessageData)
      setSocketMessage({
        sender:getMessageData?.senderId,
        text:getMessageData?.text,
        createdAt:Date.now()
      })
  })
 },[messages])
 useEffect(()=>{
  socketMessage && currentChat?.members.includes(socketMessage.sender) && setMessages((prev)=>[...prev,socketMessage])
 },[currentChat,socketMessage])

  useEffect(()=>{
    socket.current.emit("addUser",user?.userId);
    socket.current.on("getUsersFromSocketServer",users=>{
      setOnlineUsers(users)
     // console.log("getUsersFromSocketServer:",users)
    })
    
  },[user?.userId])
 
//console.log("socket:",socket)==============
useEffect(()=>{
  setChats(data)
},[data])
//=============getmessages=========

//============send message handler================
const [ sendMessage]= useSendMessageMutation()
const [text, setText] = useState("");
const handleOnEnter = async () => {
  const reciverId = currentChat?.members.find(fId=>fId !==user?.userId )
  const data ={
       chatId:currentChat,
       senderId:user?.userId,
       text:text
  }
  socket.current.emit("sendMessage",{senderId:user.userId, receiverId:reciverId, text:text})
 console.log("enter text", data);
  sendMessage(data)
}
// const handleSendMessage=(event)=>{
//   event.preventDefault();
//   const reciverId = currentChat?.members.find(fId=>fId !==user?.userId )
  // const data ={
  //      chatId:currentChat,
  //      senderId:user?.userId,
  //      text:text
  // }
//   socket.current.emit("sendMessage",{senderId:user.userId, receiverId:reciverId, text:text})
// // console.log("handleSendMessage", data);
 //  sendMessage(data)
// }
useEffect(()=>{
  
  scrollRef.current?.scrollIntoView({behavior:"smooth"})
},[messages,message])
  return (
    <div >
      <div className="topbar">
      <TopBar/>
      </div>
      <div className="messenger">
        {/*=========== left part start ===========*/}
        <div className="chatMenu">
            <div className="chatMenuWrapper">
            <input type="text" placeholder="Search for friends" className="chatMenuInput" />
            {chats && chats?.map((chat)=>(
              <div onClick={()=>setCurrentChat(chat)} key={chat?._id}><Conversation chat={chat} onlineUsers={onlineUsers} /></div>
            ))}
            </div>
        </div>
        {/*=========== left part end =============*/}
        {/*=========== Middle Message part start ===========*/}
        <div className="chatBox">
        <div className="chatBoxWrapper">
          {currentChat?._id ? <>
            <div className="chatBoxTop">
              { message.map(msg=>(
                <div ref={scrollRef} key={msg._id}>
                  <Message msg={msg} own={msg?.senderId===user?.userId} />
                </div>
              ))}
              {/* <Message own={true} /> */}
              
             </div>
             <div className="chatBoxBottom w-full ">
             <div className=" w-full "><InputEmoji 
                value={text}
                onChange={setText}
                cleanOnEnter
                onEnter={handleOnEnter}
                placeholder="Type a message"
                /></div> 
            <div  className="flex items-center justify-center w-16 h-10 px-3 rounded-md bg-black text-white font-semibold cursor-pointer ">Send</div>
             </div>
          </> : <span>Open a conversation to start a chat</span>}
             
            </div>
        </div>
         {/*=========== Middle Message part end ===========*/}
         {/*=========== Right part start =========== onlineUsers={onlineUsers} */}
        <div className="chatOnline"> 
          <div className="chatOnlineWrapper">
            {
              onlineUsers &&   <ChatOnline  />
            }
          </div>
        </div>
         {/*=========== Right part end ===========*/}
      </div>
    </div>
  )
}

export default Chat