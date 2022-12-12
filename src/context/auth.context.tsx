import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User,
  updatePassword,
  updateEmail,
} from "firebase/auth";
import { auth } from "../config/firebase.config";
import { DatabaseService } from "../services/db.service";
import { useRouter } from "next/router";
import { DocumentData } from "firebase/firestore";

export interface UserType extends User {
  bio?: string;
  password?: string;
}

const AuthContext = createContext(
  {} as {
    user: UserType | null;
    signUp: (email: string, password: string) => Promise<UserType>;
    logIn: (email: string, password: string) => Promise<UserCredential>;
    logOut: () => void;
    updateUser: (user: UserType) => Promise<void>;
    getProfile: (user: UserType) => Promise<DocumentData | null>;
  }
);

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/profile");
    else router.push("/");
  }, [user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
      if (user) {
        const findUser = await DatabaseService.getUserByUid(user.uid);
        setUser(user);
        if (!findUser) {
          const u = await DatabaseService.createUser(user);
          setUser(u as UserType);
        } else {
          setUser(findUser as UserType);
        }
      }
    });
    setLoading(false);

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return user;
  };

  const getProfile = async (user: User) => {
    const userProfile = await DatabaseService.getUserByUid(user.uid);
    setUser(userProfile as UserType);
    return userProfile;
  };

  const logIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  const updateUser = async (u: UserType) => {
    try {
      if (u.email) await updateEmail(auth.currentUser!, u.email);
    } catch (err) {}
    try {
      if (u.password) await updatePassword(auth.currentUser!, u.password);
    } catch (err) {}
    await DatabaseService.updateUser(u);
  };

  return (
    <AuthContext.Provider
      value={{ user, signUp, logIn, logOut, updateUser, getProfile }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
