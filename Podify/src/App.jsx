import { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import Layout from "../components/layout";
import Home from "./pages/home";
import ShowDetails from "./pages/show";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/show/:id" element={<ShowDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
