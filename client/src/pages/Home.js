import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "../style/home.css";
import Card from '../components/card';

import Moviedetails from "./moviedetails";

function Home() {

  return (
    <div className="index">
      <h1>HOME</h1>
    </div>
  );
}

export default Home;