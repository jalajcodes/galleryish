import React from "react";
import UploadForm from "../comps/UploadForm";
import { useAuth } from "../hooks/useAuth";
import ImageGrid from "./ImageGrid";

const MySpace = ({ setSelectedImg, setCommentOpen }) => {
    const { user } = useAuth();
    return (
        <div>
            <UploadForm user={user} />
            <ImageGrid setSelectedImg={setSelectedImg} setCommentOpen={setCommentOpen} personal />
        </div>
    );
};

export default MySpace;
