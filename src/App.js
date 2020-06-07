import React from 'react';
import './App.css';
import AnimatedHorse from './components/AnimatedMan'
import UserList from './components/UserList'
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <ToastProvider>
    <div className="App">
      <AnimatedHorse />
      <div>
        <UserList />
      </div>
    </div></ToastProvider>
  );
}

export default App;
