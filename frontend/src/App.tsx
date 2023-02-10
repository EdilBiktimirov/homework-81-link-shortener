import React from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./features/shortUrl/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path={'/'} element={<Home/>}/>
        <Route path={'*'} element={<h1>Not found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
