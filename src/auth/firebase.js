import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";

//* https://firebase.google.com/docs/auth/web/start
//* https://console.firebase.google.com/ => project settings
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
// const firebaseConfig = {
//   apiKey: "AIzaSyDMmdRHMr-nx7fCZdvnmI_lVdHFS1_O5XY",
//   authDomain: "movie-app-5f597.firebaseapp.com",
//   projectId: "movie-app-5f597",
//   storageBucket: "movie-app-5f597.appspot.com",
//   messagingSenderId: "747422570503",
//   appId: "1:747422570503:web:c5b853a8f80dee233632a2",
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export const createUser = async (email, password, displayName, navigate) => {
  try {
    let userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(auth.currentUser, {
      displayName: displayName,
    });

    navigate("/");
    console.log(userCredential);
  } catch (err) {
    toast.error(err.message);
  }
};

//* https://console.firebase.google.com/
//* => Authentication => sign-in-method => enable Email/password
export const signIn = async (email, password, navigate) => {
  try {
    let userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    navigate("/");
    toast.success("Signed in successfully");
    console.log(userCredential);
  } catch (err) {
    toast.error(err.message);
  }
};

export const logOut = () => {
  signOut(auth);
  toast.success("Logged out successfully");
};

export const userObserver = (setCurrentUser) => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      setCurrentUser(currentUser);

      // ...
    } else {
      // User is signed out
      setCurrentUser(false);
    }
  });
};


export const signUpProvider=(navigate)=>{
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result)
    navigate("/")
  }).catch((error) => {
    toast.error(error.message)

  });
}