import React from "react";
import SignUp from "../../components/signup/signup-form.component";
import SignIn from "../../components/signin/signin-form.component";
import "./authentication.style.css"

function Authentication() {
  return (
    <div className="authentication-container">
      <SignIn />
      <SignUp />
    </div>
  );
}

export default Authentication;
