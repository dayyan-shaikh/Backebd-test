import { Outlet,Navigate} from 'react-router-dom';

const ProtectedRoute = () => {
  const user = null
  return user ? <Outlet/> : <Navigate to='/'/>
}

export default ProtectedRoute;