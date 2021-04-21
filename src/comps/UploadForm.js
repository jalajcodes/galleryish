import React, { useState } from "react";
import PersonalProgressBar from "./PersonalProgressBar";
import ProgressBar from "./ProgressBar";

const UploadForm = ({ user }) => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

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

    return (
        <form>
            <h3>{user ? "Upload a Private Photo" : "Upload a Public Photo"}</h3>
            <label>
                <input type="file" onChange={handleChange} />
                <span>+</span>
            </label>
            <div className="output">
                {error && <div className="error">{error}</div>}
                {file && <div>{file.name}</div>}
                {file && user ? <PersonalProgressBar file={file} setFile={setFile} /> : null}
                {file && !user ? <ProgressBar file={file} setFile={setFile} /> : null}
            </div>
        </form>
    );
};

export default UploadForm;
