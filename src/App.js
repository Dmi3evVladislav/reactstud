import React from "react";
import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./pages/About";
import Main from "./pages/Main";
import Posts from "./pages/Posts";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/posts" element={<Posts/>}/>
      </Routes>
      
    </BrowserRouter>
  )
  
}

export default App;
