import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "./Components/auth/authUser"
import { UserContextProvider } from "./context/UserContext"

const App = () => {
  return (
<>
<BrowserRouter>
<UserContextProvider>
<main>
  <Routes>
  <Route path="/verfiyUser" element={<AuthenticateUser/>}/>
  </Routes>
</main>
</UserContextProvider>
</BrowserRouter>
</>
  )
}

export default App
