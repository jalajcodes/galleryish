import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";
import "firebase/firestore";
import { toast } from "react-toastify";
import { DeleteIcon } from "../comps/Icons";

const CommentModal = ({ commentOpen, setCommentOpen }) => {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState("");
    const collectionName = commentOpen.personal ? "personalImages" : "images";

    const overlayVariants = useRef({
        hidden: {
            scale: 0,
        },
        visible: {
            scale: 1,
            transition: {
                duration: 0.4,
            },
        },
    }).current;

    useEffect(() => {
        console.log("useEffect ran");
        const unsub = projectFirestore
            .collection(collectionName)
            .doc(commentOpen.id)
            .onSnapshot((snap) => {
                // setComments(doc.data().comments)
                let documents = [];
                snap.data().comments.forEach((doc) => {
                    documents.push(doc);
                });

                setComments(documents);
            });
        return () => {
            unsub();
        };
    }, [collectionName, commentOpen.id]);

    const handleChange = (e) => {
        const comment = e.target.value;
        setInput(comment);
    };

    const handleClick = () => {
        setCommentOpen(false);
    };
    const handleSubmit = (e) => {
        if (e.keyCode === 13) {
            const comment = {
                comment: input,
                author: commentOpen.user.displayName,
                photo: commentOpen.user.photoURL,
                email: commentOpen.user.email,
            };
            projectFirestore
                .collection(collectionName)
                .doc(commentOpen.id)
                .update({
                    comments: firebase.firestore.FieldValue.arrayUnion(comment),
                })
                .then((doc) => setInput(""))
                .catch((err) => {
                    toast("Unable to add comment. Try again later", { type: "error" });
                });
        }
    };

    const handleDelete = (comment) => {
        projectFirestore
            .collection(collectionName)
            .doc(commentOpen.id)
            .update({
                comments: firebase.firestore.FieldValue.arrayRemove(comment),
            })
            .then(() => {
                console.log("Deleted");
            })
            .catch(() => {
                toast("Try again later!", {
                    type: "error",
                });
            });
    };

    return (
        <motion.div
            className="backdrop"
            onClick={handleClick}
            variants={overlayVariants}
            initial="hidden"
            animate="visible">
            <motion.div onClick={(e) => e.stopPropagation()} className="comments-wrapper">
                <h1>{comments.length === 1 ? "1 Comment" : `${comments.length} Comments`}</h1>
                {comments.map((c, i) => {
                    return (
                        <div key={i} className="comments">
                            <span className="comments-text">
                                {c.comment}{" "}
                                {c.email === commentOpen.user.email && (
                                    <div className="delete-icon" onClick={() => handleDelete(c)}>
                                        <DeleteIcon />
                                    </div>
                                )}
                            </span>
                            {/* Hardcoded values for supporting login as guest */}
                            <img
                                src={c.photo ? c.photo : "https://picsum.photos/id/191/200"}
                                alt={c.commentedBy ? c.commentedBy : "Test User"}
                                title={c.commentedBy ? c.commentedBy : "Test User"}
                            />
                        </div>
                    );
                })}

                <motion.input
                    disabled={!commentOpen.user}
                    onKeyUp={handleSubmit}
                    value={input}
                    onChange={handleChange}
                    type="text"
                    placeholder={
                        commentOpen.user
                            ? "Type and press ENTER to comment..."
                            : "Only logged in users can comment."
                    }></motion.input>
            </motion.div>
        </motion.div>
    );
};

export default CommentModal;
