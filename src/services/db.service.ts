import { doc, DocumentData, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { UserType } from "../context/auth.context";

export const DatabaseService = {
  getUserByUid: async (uid: string): Promise<DocumentData | null> => {
    const docRef = doc(db, "users", uid);
    const snapDoc = await getDoc(docRef);

    if (snapDoc.exists()) {
      return snapDoc.data();
    } else {
      return null;
    }
  },
  createUser: async (user: UserType): Promise<DocumentData | null> => {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      photoURL: user.photoURL,
      displayName: user.displayName,
      bio: "",
      phoneNumber: user.phoneNumber,
      email: user.email,
    }).catch((err) => {
      console.log(err);
    });
    return await DatabaseService.getUserByUid(user.uid);
  },
  updateUser: async (user: UserType) => {
    console.log(user.uid);
    await updateDoc(doc(db, 'users', user.uid), {
      ...user
    }).catch((err) => {
      console.log(err);
    }).then((res) => {
      console.log(res);
    });
  },
  deleteUser: () => {

  }
}