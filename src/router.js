import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import SignIn from "./Pages/Sign-in"
import SignUp from "./Pages/Sign-up";
import Home from "./Pages/Home";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

function PublicRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem("token");

  return isAuthenticated ? <Navigate to={redirectTo} /> : <Outlet /> 
}

function MainRoutes() {
 


  return (
    <div>
      <Routes>
      <Route element={<PublicRoutes redirectTo='/home' />}>
      <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} /> 
          </Route>
          <Route element={<ProtectedRoutes redirectTo='/' />}>
            <Route path="/home" element={<Home />}/> 
          </Route>
      </Routes>
    </div>
    
  )
} 

export default MainRoutes;