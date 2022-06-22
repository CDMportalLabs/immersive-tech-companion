import React, { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

export default function Signup() {

  const [isLoginOpen, setLoginOpen] = useState(false);

  return (
      isLoginOpen ? <LoginForm handleLoginOpen={setLoginOpen}/> : <SignupForm handleLoginOpen={setLoginOpen}/>
  )
}