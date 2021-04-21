import firebase from "firebase/app";
import { useCallback, useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";

export const useAuth = () => {
    const [user, setUser] = useState("");
    useEffect(() => {
        projectAuth.onAuthStateChanged((user) => {
            if (user && user.email) {
                setUser(user || "");
                projectFirestore.collection("user").doc(user.email).set(
                    {
                        email: user.email,
                        photo: user.photoURL,
                        name: user.displayName,
                    },
                    {
                        merge: true,
                    }
                );
            } else {
                setUser("");
            }
        });
    }, []);

    const signOut = useCallback(() => {
        projectAuth.signOut();
    }, []);

    const anonLogin = useCallback(() => {
        projectAuth
            .signInWithEmailAndPassword("test@user.com", "12345test")
            .then((user) => {
                // Signed in
                console.log("anon user", user);
            })
            .catch((error) => {
                console.log("anon error", error);
            });
    }, []);

    const googleLogin = useCallback(
        () => projectAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()),
        []
    );
    return { user, signOut, googleLogin, anonLogin };
};
