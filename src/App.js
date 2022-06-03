import React from "react";
import { ToastContainer } from "react-toastify";
import AuthContextProvider from "./context/AuthContext";
import AppRouter from "./router/AppRouter";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <AppRouter />
        <ToastContainer position="bottom-left" newestOnTop limit={2}/>
      </AuthContextProvider>
    </div>
  );
};

export default App;
