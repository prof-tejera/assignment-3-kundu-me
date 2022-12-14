import React from "react";
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import ConfigureView from "./views/ConfigureView";
import HistoryView from "./views/HistoryView";
import AppContext from "./AppContext";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Sample Timers</Link>
        </li>
        <li>
          <Link to="/add">My Timers</Link>
        </li>
        <li>
          <Link to="/history">Workout History</Link>
        </li>
        <li>
          <Link to="/docs">Documentation</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <AppContext>
      <Container>
        <Router>
          <Nav />
          <Routes>
            <Route path="/docs" element={<DocumentationView />} />
            <Route path="/" element={<TimersView />} />
            <Route path="/add" element={<ConfigureView />} />
            <Route path="/history" element={<HistoryView />} />
          </Routes>
        </Router>
      </Container>
    </AppContext>
  );
};

export default App;
