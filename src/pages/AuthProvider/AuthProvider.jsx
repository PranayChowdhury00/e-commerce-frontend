import React, { createContext, useEffect, useState } from 'react';
export const AuthContext = createContext(null);
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,GoogleAuthProvider,signInWithPopup, onAuthStateChanged    } from "firebase/auth";
import auth from '../../Firebase/firebase';
const provider = new GoogleAuthProvider();
const AuthProvider = ({children}) => {
    const [loader,setLoader]=useState(true);
    const [user,setUser]=useState(null);
    const createNewUser = (email,password)=>{
        setLoader(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signInUser = (email,password)=>{
        setLoader(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const signOutUser =()=>{
        setLoader(true);
       return signOut(auth);
    }
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(manageUser)=>{
            setUser(manageUser);
            setLoader(false)
        })
        return unsubscribe;
    },[])
    const googleSignIn = ()=>{
        setLoader(true);
        return signInWithPopup(auth,provider);
    }

    const authInfo={
        loader,
        user,
        createNewUser,
        signInUser,
        signOutUser,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
           {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;