import { useCallback, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

export const useImage = (user) => {
    const [imageList, setImageList] = useState([]);
    const [publicImageList, setPublicImageList] = useState([]);

    const fetchUserImages = useCallback((user) => {
        if (user) {
            projectFirestore
                .doc(`galleryish/${user}`)
                .get()
                .then((snap) => {
                    const data = snap.data();
                    if (data && "images" in data) {
                        setImageList(data.images);
                    } else {
                        setImageList([]);
                    }
                });
        }
    }, []);
    const fetchPublicImages = useCallback(() => {
        projectFirestore
            .doc(`galleryish/public`)
            .get()
            .then((snap) => {
                const data = snap.data();
                if (data && "images" in data) {
                    setPublicImageList(data.images);
                } else {
                    setPublicImageList([]);
                }
            });
    }, []);
    useEffect(() => {
        fetchPublicImages();
        if (user) {
            fetchUserImages(user);
        }
    }, [user, fetchUserImages, fetchPublicImages]);
    return { imageList, fetchUserImages, fetchPublicImages, publicImageList };
};
