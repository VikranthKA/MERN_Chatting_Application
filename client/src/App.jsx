import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios";

import { Suspense } from "react";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>

      <Routes>

        {/* <Route path="/auth" element={<Auth/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path="*" element={<Auth/>} /> */}

      </Routes>
    </BrowserRouter>
  )
}


export default App
