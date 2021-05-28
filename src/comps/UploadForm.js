import React, { useState } from "react";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import PersonalProgressBar from "./PersonalProgressBar";
import ProgressBar from "./ProgressBar";
import { useAuth } from "../hooks/useAuth";

const UploadForm = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const location = useLocation();
    const { user } = useAuth();

    const types = ["image/png", "image/jpeg"];

    const handleChange = (e) => {
        let selected = e.target.files[0];

        if (selected && types.includes(selected.type)) {
            setFile(selected);
            setError("");
        } else {
            setFile(null);
            setError("Please select an image file (png or jpg)");
        }
    };

    const handleClick = (e) => {
        if (!user) {
            e.preventDefault();
            toast("Please Login to start uploading photos.", { type: "error" });
        }
    };

    return (
        <form>
            {location.pathname === "/myspace" ? (
                <>
                    <h3>Upload a Private Photo</h3>
                    <label>
                        <input type="file" onChange={handleChange} />
                        <span>+</span>
                    </label>
                </>
            ) : (
                <>
                    <h3>Upload a Public Photo</h3>
                    <label>
                        <input type="file" onChange={handleChange} onClick={handleClick} />
                        <span>+</span>
                    </label>
                </>
            )}

            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && user && location.pathname === "/myspace" ? (
                  <PersonalProgressBar file={file} setFile={setFile} />
                ) : null}
                {file && user && location.pathname === "/" ? (
                  <ProgressBar file={file} setFile={setFile} />
                ) : null}
            </div>
        </form>
    );
};

export default UploadForm;
