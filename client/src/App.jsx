import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "./Components/auth/authUser"
import { UserContextProvider } from "./context/UserContext"
import axios from "axios";
import Chat from "./Components/Chat/chat";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          <main>
            <Routes>

              {/* yet to add the protected and privated route */}

              <Route path="/" element={<Chat />} />

              <Route path="/verifyUser" element={<AuthenticateUser />} />

            </Routes>
          </main>
        </UserContextProvider>
      </BrowserRouter>
    </>
  )
}

export default App
