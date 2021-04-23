import React from "react";
import { toast } from "react-toastify";
import { projectFirestore } from "../firebase/config";
import firebase from "firebase/app";
import "firebase/firestore";
import { LikeIcon, DislikeIcon, CommentIcon, DeleteIcon } from "../comps/Icons";

const ImageOverlay = ({ doc, user, setCommentOpen, personal }) => {
    const collectionName = personal ? "personalImages" : "images";

    const handleLike = (e, id) => {
        e.stopPropagation();
        if (!user) {
            return toast("Only Logged in Users can like Photos.", { type: "error" });
        }
        projectFirestore
            .collection(collectionName)
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.increment(1),
                likedBy: firebase.firestore.FieldValue.arrayUnion(user.email),
            })
            .then(() => console.log("liked!"))
            .catch((err) => {
                console.log(err);
            });
    };

    const handleDislike = (e, id) => {
        e.stopPropagation();
        projectFirestore
            .collection(collectionName)
            .doc(id)
            .update({
                likes: firebase.firestore.FieldValue.increment(-1),
                likedBy: firebase.firestore.FieldValue.arrayRemove(user.email),
            })
            .then(() => console.log("disliked!"))
            .catch((err) => {
                console.log(err);
            });
    };

    const handleComment = (e, id) => {
        e.stopPropagation();
        setCommentOpen({
            modal: true,
            id,
            personal: personal ? true : false,
            user,
        });
    };

    const handleDelete = (e, id) => {
        e.stopPropagation();
        projectFirestore
            .collection(collectionName)
            .doc(id)
            .delete()
            .then(() => {
                console.log("deleted");
                toast("Image Deleted Successfully.", { type: "dark" });
            })
            .catch((err) => {
                console.log(err);
                toast("Try again later!", { type: "error" });
            });
    };

    return (
        <div className="overlay">
            <>
                <div className="user-info">
                    {/* hardcoded values are used here to fix login as guest. */}
                    <img
                        src={doc.userPhoto ? doc.userPhoto : "https://picsum.photos/id/191/200"}
                        alt={doc.createdBy ? doc.createdBy : "Test User"}
                        title={`Uploaded By: ${doc.createdBy ? doc.createdBy : "Test User"}`}
                    />
                </div>
                {user && doc.likedBy.some((i) => i === user.email) ? (
                    <div onClick={(e) => handleDislike(e, doc.id)} className="like-icon">
                        <DislikeIcon likes={doc.likes} />
                    </div>
                ) : (
                    <div onClick={(e) => handleLike(e, doc.id)} className="like-icon">
                        <LikeIcon likes={doc.likes} />
                    </div>
                )}
                {doc.email === user.email && (
                    <div onClick={(e) => handleDelete(e, doc.id)} className="delete-icon">
                        <DeleteIcon />
                    </div>
                )}
                <div onClick={(e) => handleComment(e, doc.id)} className="comment-icon">
                    <CommentIcon />
                </div>
            </>
        </div>
    );
};

export default ImageOverlay;
