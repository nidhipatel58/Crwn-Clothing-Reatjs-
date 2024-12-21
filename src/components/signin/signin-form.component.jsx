import { useState } from "react";
import {
  createUserDocumentFromAuth,
  signInAuthWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./signin-form.style.css";
import Button, { Button_TYPE_CLASSES } from "../button/button.component";

const defaultFormFields = {
  email: "",
  password: "",
};

function SignIn() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const SignInWithGoogle = async () => {
    try {
      await signInWithGooglePopup();
      resetFormFields();
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthWithEmailAndPassword(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;

        case "auth/user-not-found":
          alert("No user associated with this email.");
          break;

        case "auth/invalid-credential":
          alert("Invalid credential. Please check your email and password.");
          break;

        default:
          console.error("Error signing in:", error.message);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email:"
          required
          type="email"
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password:"
          required
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit" buttonType="inverted">
            Sign In
          </Button>
          <Button type="button" onClick={SignInWithGoogle} buttonType={Button_TYPE_CLASSES.google}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
