import { useEffect, useState } from "react"
import Auth from "./pages/auth/auth"
import Home from "./pages/home/home"
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [checkToken , setToken] = useState<string | null>(null);
  useEffect(()=>{
    const storedToken = localStorage.getItem('token')
    if(storedToken !== ""){
      setToken(storedToken)
    }
  },[checkToken])
  return <div>
    {
      checkToken  ? <Router><Home/></Router> : <Auth setAuthToken={setToken}/>
    }
  </div>
  // logical wrong
} 

export default App
