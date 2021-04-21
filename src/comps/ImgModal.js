import React, { useRef } from "react";
import { motion } from "framer-motion";

const ImgModal = ({ setSelectedImg, selectedImg }) => {
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

    const handleClick = (e) => {
        if (e.target.classList.contains("backdrop")) {
            setSelectedImg(null);
        }
    };

    return (
        <motion.div
            className="backdrop"
            onClick={handleClick}
            variants={overlayVariants}
            initial="hidden"
            animate="visible">
            <motion.img
                src={selectedImg}
                layout
                alt="enlarged pic"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
            />
        </motion.div>
    );
};

export default ImgModal;
