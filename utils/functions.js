import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";






const handleSignOut = (navigation) => {
  signOut(auth)
    .then(() => {
      navigation.replace("Login");
    })
    .catch((error) => alert(error.message));
};

export { handleSignOut };
