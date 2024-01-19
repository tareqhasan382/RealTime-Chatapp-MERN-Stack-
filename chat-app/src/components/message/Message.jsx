import "./Message.css";
import { format } from "timeago.js";
import PropTypes from 'prop-types';
const Message = ({own,msg}) => {
  return (
    <div className={own ? "message own" :"message"}>
       <div className="messsageTop">
        <img className="messsageImg" src="https://phowdimages.azureedge.net/cloud/pics/8137/p/c7bfc992b6614bf9a36057506e1bfc4c/1.jpg?preset=details" alt="img" />
        <p className="messsageText">{msg?.text} </p>
       </div>
       <div className="messageBottom">{format(msg.createdAt)}</div>
    </div>
  )
}
Message.propTypes = {
    own: PropTypes.any.isRequired,
  };
Message.propTypes = {
    msg: PropTypes.any.isRequired,
  };
export default Message