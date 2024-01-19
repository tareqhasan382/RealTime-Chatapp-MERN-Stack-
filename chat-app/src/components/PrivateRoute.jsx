
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuthCheck from "../hooks/useAuthCheck";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
 const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
    const userLoggedIn = useAuthCheck();
    const isLoggedIn = useAuth();
    useEffect(() => {
        if(userLoggedIn){
            if(!isLoggedIn){
                navigate("/")
            }
        }
        
      }, [isLoggedIn,navigate,userLoggedIn]);
    return children
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
export default PrivateRoute;