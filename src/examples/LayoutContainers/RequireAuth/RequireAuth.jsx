import { useLocation, Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';

import { useAuth } from 'hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (allowedRoles.includes(user?.role)) {
    return <Outlet />;
  } else if (user) {
    return <Navigate to="/error-500" state={{ from: location }} replace />;
  } else {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
};

export default RequireAuth;

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};
