
import "./ChatOnline.css"
// import { useEffect, useState } from "react";
// import { useGetUserQuery } from "../../redux/api/authApi";

const ChatOnline = () => {
//   const { user } = useSelector((state) => state.auth) || {};
//   const [friends,setFriends] = useState([]);
//   const [onlineFriends,setOnlineFriends] = useState([]);
//   const {data}=useGetUserQuery(user)
//   console.log("data:",data)
//   // const reciverId = currentChat?.members.find(fId=>fId !==user?.userId )
//   useEffect(()=>{

//   },[])
//  console.log("onlineUsers:",onlineUsers?.onlineUsers)
  // {online ? "message own" :"message"}
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImageContainer">
        <img src="https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details" alt="img" className=" chatOnlineImage " />
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">Tareq Hasan</span>
      </div>
    </div>
  )
}

export default ChatOnline