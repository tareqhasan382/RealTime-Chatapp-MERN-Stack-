import { useEffect, useState } from "react"
import  "./Conversation.css"
import { useSelector } from "react-redux";
import axios from "axios";
import { BaseURL } from "../../redux/api/baseApi";
import PropTypes from 'prop-types';
const Conversation = ({chat,onlineUsers}) => {
  // const conversation= chat;
  // const friend = conversation?.members.find(fId=>console.log("friendId:",fId))
  const { user } = useSelector((state) => state.auth) || {};
  const [onlineFriends,setOnlineFriends] = useState([])
  console.log("onlineFriends:",onlineFriends)
  const [userData,setUserData] = useState(null)
  const friendId = chat?.members.find(fId=>fId !==user?.userId )
 // console.log("friendId:",friendId)
  useEffect(()=>{
    const getUserData = async () => {
       const {data } = await axios.get(`${BaseURL}/api/v1/user/${friendId}`)
       setUserData(data)
    }
    if(chat !== null) getUserData()
  },[chat,friendId])
useEffect(()=>{
  setOnlineFriends(friendId.filter(onf=>onlineUsers.includes(onf)))
},[friendId,onlineUsers])
//  chatOnlineName
  return (
    
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImageContainer">
        <img src="https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details" alt="img" className=" chatOnlineImage " />
            <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{userData?.name}</span>
      </div>
    </div>
  )
}
Conversation.propTypes = {
  chat: PropTypes.any.isRequired,
};
Conversation.propTypes = {
  onlineUsers: PropTypes.any.isRequired,
};
export default Conversation

// <div className="conversation">
    //   <img src="https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details" alt="img" className=" ConversationImg " />
    //   <div className="chatOnlineBadge"></div>
    //   <span className="conversationName">{userData?.name}</span>
    // </div>