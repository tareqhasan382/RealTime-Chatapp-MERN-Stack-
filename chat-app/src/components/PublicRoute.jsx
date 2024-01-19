import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import PropTypes from 'prop-types';
export default function PublicRoute({ children }) {
    const isLoggedIn = useAuth();

    return !isLoggedIn ? children : <Navigate to="/inbox" />;
}
PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };