import React from "react";
import useFirestore from "../hooks/useFirestore";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import ImageOverlay from "../comps/ImageOverlay";

const ImageGrid = ({ setSelectedImg, setCommentOpen, personal }) => {
    const { user } = useAuth();
    const { docs: personalDocs } = useFirestore("personalImages", user.email);
    const { docs } = useFirestore("images");

    if (personal) {
        return (
            <div className="img-grid">
                {personalDocs &&
                    personalDocs.map((doc) => (
                        <motion.div
                            className="img-wrap"
                            key={doc.id}
                            layout
                            // whileHover={{ opacity: 1 }}
                            onClick={() => setSelectedImg(doc.url)}>
                            <ImageOverlay
                                doc={doc}
                                user={user}
                                setCommentOpen={setCommentOpen}
                                personal
                            />
                            <motion.img
                                layout
                                src={doc.url}
                                alt="uploaded pic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1 }}
                            />
                        </motion.div>
                    ))}
            </div>
        );
    }
    return (
        <div className="img-grid">
            {docs &&
                docs.map((doc) => (
                    <motion.div
                        className="img-wrap"
                        key={doc.id}
                        layout
                        whileHover={{ opacity: 1 }}
                        onClick={() => setSelectedImg(doc.url)}>
                        <ImageOverlay doc={doc} user={user} setCommentOpen={setCommentOpen} />
                        <motion.img
                            layout
                            src={doc.url}
                            alt="uploaded pic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                        />
                    </motion.div>
                ))}
        </div>
    );
};

export default ImageGrid;
