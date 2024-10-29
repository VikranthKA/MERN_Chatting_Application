import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "./Components/auth/authUser"
import { UserContextProvider } from "./context/UserContext"
import axios from "axios";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
<>
<BrowserRouter>
<UserContextProvider>
<main>
  <Routes>
  <Route path="/verifyUser" element={<AuthenticateUser/>}/>
  </Routes>
</main>
</UserContextProvider>
</BrowserRouter>
</>
  )
}

export default App
