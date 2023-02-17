import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./component/Header";
import Cards from "./component/cards";
import CardDetails from "./component/cardDetails";
import { Routes, Route } from "react-router-dom";



function App() {
  return (
    <>
      <Header />
      <Routes>
        
        <Route path="/" element={<Cards/>}/>
        <Route path="/card/:id" element={<CardDetails />} />
      </Routes>
    </>
  );
}

export default App;
