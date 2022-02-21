import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./routes/welcome";
import AppJson from "./routes/app-json";
import AppUrlParser from "./routes/app-url-parser";
import AppUnixTime from "./routes/app-unix-time";

ReactDOM.render(<BrowserRouter>
  <Routes>
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      <Route path="json" element={<AppJson />} />
      <Route path="unix-time" element={<AppUnixTime />} />
      <Route path="url-parser" element={<AppUrlParser />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>Oops, there's nothing here!</p>
          </main>
        }
      />
    </Route>
  </Routes>
</BrowserRouter>, document.getElementById('root'));
