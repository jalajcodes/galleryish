import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import usePersonalStorage from "../hooks/usePersonalStorage";

const PersonalProgressBar = ({ file, setFile }) => {
    const { user } = useAuth();
    const { progress, url } = usePersonalStorage(file, user);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    return (
        <motion.div
            className="progress-bar"
            initial={{ width: 0 }}
            animate={{ width: progress + "%" }}></motion.div>
    );
};

export default PersonalProgressBar;
