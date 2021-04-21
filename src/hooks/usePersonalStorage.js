import { useState, useEffect } from "react";
import { projectStorage, projectFirestore, timestamp } from "../firebase/config";

const usePersonalStorage = (file, user) => {
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    useEffect(() => {
        if (user) {
            const storageRef = projectStorage.ref(file.name);
            const collectionRef = projectFirestore.collection("personalImages");
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
                    const imageToAdd = {
                        url,
                        createdAt,
                        email: userEmail,
                        createdBy,
                        userPhoto,
                        comments: [],
                        likes: 0,
                        likedBy: [],
                    };
                    await collectionRef.add(imageToAdd);
                    setUrl(url);
                }
            );
        }
    }, [file, user]);

    return { progress, url, error };
};

export default usePersonalStorage;
