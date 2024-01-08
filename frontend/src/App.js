import { Route, Routes,Navigate } from "react-router";
import Header from "../src/components/Header";
// 
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import SharePost from "./pages/SharePost";
import NotFound from "./pages/NotFound";
import ViewProfile from "./pages/ViewProfile";
import ViewPostDetails from "./pages/ViewPostDetails";

function App() {
  const loggedIn=window.localStorage.getItem("isLoggedIn")
 
   
  return (
    
    <div className="flex flex-col h-screen mb-auto min-h-screen "> 
    

      <Header />
      <Routes>
        <Route path="/"element={loggedIn? <Home />:(<Navigate to="/login" replace />)} />
        <Route path="/profile" element={loggedIn? <Profile />:(<Navigate to="/login" replace />)} />
         <Route path="/editProfile"element={loggedIn? <EditProfile />:(<Navigate to="/login" replace />)} /> 
        <Route path="/share" element={loggedIn? <SharePost />:(<Navigate to="/login" replace />)}/>
        <Route path="/viewPost" element={loggedIn? <ViewPostDetails />:(<Navigate to="/login" replace />)}/>
        
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/viewProfile" element={<ViewProfile/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer  className="mt-auto "/> */}
    </div>
  );
}

export default App;
