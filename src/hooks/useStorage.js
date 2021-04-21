import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";
import { useAuth } from "./useAuth";

const useStorage = (file) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection("images");

            storageRef.put(file).on(
                "state_changed",
                (snap) => {
                    let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                    setProgress(percentage);
                },
                (err) => {
                    setError(err);
                },
                async () => {
                    const url = await storageRef.getDownloadURL();
                    const createdAt = timestamp();
                    const createdBy = user ? user.displayName : "";
                    const userPhoto = user ? user.photoURL : "";
                    const userEmail = user ? user.email : "";

                    await collectionRef.add({
                        url,
                        email: userEmail,
                        createdAt,
                        createdBy,
                        userPhoto,
                        comments: [],
                        likes: 0,
                        likedBy: [],
                    });
                    setUrl(url);
                }
            );
        }
    }, [file, user, user.displayName, user.photoURL]);

    return { progress, url, error };
};

export default useStorage;
