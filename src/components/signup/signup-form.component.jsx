import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../firebase/firebase.utils";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import FormInput from "../form-input/form-input.component";
import "./signup-form.style.css";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Step 1: Create user with Authentication
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, {
        displayName,
      });
      // Step 2: Add user data to Firestore
      const db = getFirestore(); // Initialize Firestore
      const userDocRef = doc(db, "users", user.uid); // Reference to 'users' collection
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt: new Date(),
      });

      console.log("User data saved to Firestore");
      alert("User created and data saved successfully!");

      resetFormFields();
    } catch (error) {
      console.error("User creation encountered an error:", error);

      if (error.code === "auth/email-already-in-use") {
        alert("This email is already in use. Please use a different email.");
      } else {
        alert("Error creating user. Please try again.");
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have a account</h2>
      <span>Sign Up with Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          required
          label="Display Name:"
          type="text"
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Confirm Password:"
          required
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit" buttonType="inverted">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

export default SignUp;
