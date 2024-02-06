import { Navigate, Outlet, Route, useLocation } from "react-router"

const PrivateRoute = ({ element, authenticated, ...rest })=>{
    const location = useLocation();

    return(
        authenticated
        ? <Route element={element} {...rest} />
        : <Navigate to="login" state={{from: location}} replace />
    )
}

export {PrivateRoute}