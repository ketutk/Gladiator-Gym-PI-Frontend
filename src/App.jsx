import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Routes, Route, Router, redirect } from "react-router-dom";
import LoginPage from "./components/Auth/login";
import { Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Dashboard from "./components/Dashboard/dashboard";
import Profile from "./components/Profile/profile";
import Password from "./components/password/password";
import { Member } from "./components/Member/member";
import { Payment } from "./components/Payment/payment";
import { Admin } from "./components/Admin/admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/login"} />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<Navbar childComponent={Dashboard} />} />
      <Route path="/admin" element={<Navbar childComponent={Admin} />} />
      <Route path="/profile" element={<Navbar childComponent={Profile} />} />
      <Route path="/password" element={<Navbar childComponent={Password} />} />
      <Route path="/member" element={<Navbar childComponent={Member} />} />
      <Route path="/pembayaran" element={<Navbar childComponent={Payment} />} />
    </Routes>
  );
}

export default App;
