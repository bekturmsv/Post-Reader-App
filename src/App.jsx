
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import "../src/components/styles/App.css"
import AppRouter from './components/AppRouter/AppRouter';
import Navbar from './components/UI/Navbar/Navbar';
import { AuthContext } from './Context';


function App() {
  const [isAuth,setIsAuth]= useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    if(localStorage.getItem('auth')){
      setIsAuth(true)
    }
    setIsLoading(false)
  },[])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>

      <BrowserRouter>
        <Navbar />
        <AppRouter />

      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
