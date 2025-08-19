
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc, serverTimestamp, GeoPoint } from "firebase/firestore";
import { type User as AppUser } from "@/models/user";
import { initializeApp } from "firebase/app";

// Re-initializing here to ensure it's available.
// In a real-world scenario, this should come from environment variables,
// but for this context, we'll keep it here to avoid configuration issues.
const firebaseConfig = {
  apiKey: "AIzaSyDCaNgCa9ViyRhAOx54YWrDcCrg2MXMiEE",
  authDomain: "arogya-sathi-web.firebaseapp.com",
  projectId: "arogya-sathi-web",
  storageBucket: "arogya-sathi-web.appspot.com",
  messagingSenderId: "98089851553",
  appId: "1:98089851553:web:e960614b8b7159539beee0"
};
initializeApp(firebaseConfig);


interface AuthContextType {
  user: User | null;
  userData: AppUser | null;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<any>;
  signup: (email: string, pass: string, name: string, role: 'patient'|'doctor') => Promise<any>;
  logout: () => Promise<any>;
  googleLogin: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  isLoading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  googleLogin: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<AppUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as AppUser);
        } else {
           // This case can happen if a user is created in Firebase Auth but not in Firestore.
           // For Google Sign-in, we handle this in the googleLogin function itself.
           setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email: string, pass: string) => {
    return signInWithEmailAndPassword(auth, email, pass);
  };
  
  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    
    // Check if user exists in Firestore
    const userDocRef = doc(db, 'users', user.uid);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Create a new user profile in Firestore
      await setDoc(userDocRef, {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber || "", // Set phone to empty string if not available
        role: "patient", // Default role
        profileImage: user.photoURL,
        createdAt: serverTimestamp(),
        authProvider: 'google',
      });
    }
  }

  const signup = async (email: string, pass: string, name: string, role: 'patient'|'doctor') => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = userCredential.user;
    
    // Create a user document in Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      phone: "", // Or collect this on signup form
      role,
      profileImage: "",
      createdAt: serverTimestamp(),
      authProvider: 'email/password'
    });
    
    // If the user is a doctor, create a public doctor profile
    if (role === 'doctor') {
        await setDoc(doc(db, "doctors", user.uid), {
            name,
            specialty: "General Physician", // Default value
            qualification: "MBBS", // Default value
            experience: "1 year", // Default value
            rating: 4, // Default value
            reviews: 0, // Default value
            avatar: "https://placehold.co/100x100.png",
            distance: "2 km away", // Default, should be calculated
            location: new GeoPoint(17.402923, 78.474664), // Default to Hyderabad
            telemedicineEnabled: true,
            userId: user.uid
        });
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    user,
    userData,
    isLoading,
    login,
    signup,
    logout,
    googleLogin,
  };

  return <AuthContext.Provider value={value}>{!isLoading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
