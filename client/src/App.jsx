import { BrowserRouter, Route, Routes } from "react-router-dom"
import axios from "axios";
import { Button } from "./components/ui/button";

const App = () => {
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
          <main>
            <Button>Click me</Button>
            {/* <Routes>


              <Route path="/" element={<>hi</>} />

              <Route path="/verifyUser" element={<>hi</>} />

            </Routes> */}
          </main>
      </BrowserRouter>
    </>
  )
}

export default App
