import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection, email) => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        if (email) {
            const unsub = projectFirestore
                .collection(collection)
                .where("email", "==", email)
                .orderBy("createdAt", "desc")
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id });
                    });
                    setDocs(documents);
                });

            return () => unsub();
        } else {
            const unsub = projectFirestore
                .collection(collection)
                .orderBy("createdAt", "desc")
                .onSnapshot((snap) => {
                    let documents = [];
                    snap.forEach((doc) => {
                        documents.push({ ...doc.data(), id: doc.id });
                    });
                    setDocs(documents);
                });

            return () => unsub();
        }
        // this is a cleanup function that react will run when
        // a component using the hook unmounts
    }, [collection, email]);

    return { docs };
};

export default useFirestore;
