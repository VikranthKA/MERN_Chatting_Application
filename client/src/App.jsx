import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios";

import { Suspense } from "react";
import Login from "./pages/login";
import Home from "./pages/home";
import SignUp from "./pages/signup";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <div className="p-4 h-screen flex items-center justify-center ">
    <BrowserRouter> 

      <Routes>

        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />


       
        <Route path="*" element={<h1>Not found</h1>} />

      </Routes>
    </BrowserRouter>
    </div>
  )
}


export default App
