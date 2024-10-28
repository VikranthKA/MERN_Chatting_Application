import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthenticateUser from "./Components/auth/authUser"

const App = () => {
  return (
<>
<BrowserRouter>
<main>
  <Routes>
  <Route path="/verfiyUser" element={<AuthenticateUser/>}/>
  </Routes>
</main>
</BrowserRouter>
</>
  )
}

export default App
