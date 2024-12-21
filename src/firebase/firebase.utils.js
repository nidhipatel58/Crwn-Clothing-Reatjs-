import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
import { useCallback } from "react";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhoiPQtjV9g951SEDs_GgXnTjoJ5XVF54",
  authDomain: "crwn-clothings-db-9f5d8.firebaseapp.com",
  projectId: "crwn-clothings-db-9f5d8",
  storageBucket: "crwn-clothings-db-9f5d8.appspot.com",
  messagingSenderId: "545411583743",
  appId: "1:545411583743:web:9b2f3a677fc8f47d8806ca",
  measurementId: "G-6TKJY75GD7",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Google Provider Setup
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

// Authentication and Firestore Exports
export const auth = getAuth();
export const db = getFirestore();

// Google Sign-In Functions
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);

// Utility function to handle Firebase Authentication errors
export const handleAuthError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "This email is already in use. Please try a different email.";
    case "auth/weak-password":
      return "Password is too weak. Please use a stronger password.";
    case "auth/invalid-email":
      return "Invalid email format. Please check your email.";
    default:
      return "An unexpected error occurred. Please try again.";
  }
};

export const addCollectionDocument = async (collectionKey, objectsToAdd) => {
  if (!Array.isArray(objectsToAdd)) {
    console.error("objectsToAdd must be an array");
    return;
  }
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("Done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");

  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// Function to create a user document in Firestore
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalData = {}
) => {
  if (!userAuth) {
    console.error("Invalid userAuth object:", userAuth);
    return;
  }

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
      console.log("User document created successfully");
    } catch (error) {
      console.error("Error creating the user document:", error);
    }
  }
};

// Function to create a user with email and password
export const createAuthUserWithEmailAndPassword = async (
  email,
  password,
  displayName
) => {
  if (!email || !password) return;

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Update display name in Firebase Authentication
    if (displayName) {
      await updateProfile(userCredential.user, { displayName });
    }

    // Create user document in Firestore
    await createUserDocumentFromAuth(userCredential.user, { displayName });

    return userCredential;
  } catch (error) {
    console.error("Error creating user with email and password:", error);
    throw new Error(handleAuthError(error)); // Handle error with a custom message
  }
};

// Retrieve a user document from Firestore
export const getUserDocument = async (userId) => {
  if (!userId) return null;

  const userDocRef = doc(db, "users", userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    console.error("User document not found for ID:", userId);
    return null;
  }
};

// Update user document in Firestore
export const updateUserDocument = async (userId, updates) => {
  if (!userId || !updates) return;

  const userDocRef = doc(db, "users", userId);

  try {
    await setDoc(userDocRef, updates, { merge: true });
    console.log("User document updated successfully");
  } catch (error) {
    console.error("Error updating user document:", error);
    throw error;
  }
};

export const signInAuthWithEmailAndPassword = async (email, password) => {
  console.log("Attempting sign-in with email:", email);
  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign Out Users:-
export const signOutUser = async () => {
  await signOut(auth);
};

export const onAuthStateChangedListner = (callback) =>
  onAuthStateChanged(auth, callback);
