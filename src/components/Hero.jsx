import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import "./Hero.css";
import bigImage from "../assets/big.png";
import capImage from "../assets/cap.jpg";
import maxImage from "../assets/max.jpg";
import lucasImage from "../assets/lucas.jpg";

const Hero = () => {
    const [showHero, setShowHero] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowHero(true);
        }, 3000); // After title animation, show Hero Section

        return () => clearTimeout(timeout);
    }, []);

    // 🟢 Function to Create Mouse Movement Effect
    const useImageMovement = (range = 200) => {
        const x = useMotionValue(0);
        const y = useMotionValue(0);
        const speed = useMotionValue(50);

        const springConfig = (velocity) => ({
            stiffness: Math.min(30 + velocity * 1.5, 80),
            damping: 15 + velocity * 0.2,
            mass: 1.2,
        });

        const xMove = useSpring(useTransform(x, [-0.5, 0.5], [-range, range]), springConfig(speed.get()));
        const yMove = useSpring(useTransform(y, [-0.5, 0.5], [-range, range]), springConfig(speed.get()));

        const handleMouseMove = (event) => {
            const { clientX, clientY, currentTarget, movementX, movementY } = event;
            const { left, top, width, height } = currentTarget.getBoundingClientRect();

            const xOffset = ((clientX - left) / width - 0.5) * 2;
            const yOffset = ((clientY - top) / height - 0.5) * 2;

            const velocity = Math.sqrt(movementX ** 2 + movementY ** 2);
            speed.set(velocity);

            x.set(xOffset);
            y.set(yOffset);
        };

        const handleMouseLeave = () => {
            x.set(0);
            y.set(0);
            speed.set(30);
        };

        return { xMove, yMove, handleMouseMove, handleMouseLeave };
    };

    const bigImageMotion = useImageMovement(200);
    const capImageMotion = useImageMovement(200);
    const topRightImageMotion = useImageMovement(200); // 🆕 Added new image effect
    const bottomLeftImageMotion = useImageMovement(200); // 🆕 Added new image effect

    return (
        <div className="hero-container">
            {!showHero ? (
                // Title Animation
                <motion.div className="intro-title">
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <motion.span
                            className="title-outline"
                            initial={{ color: "black", WebkitTextStroke: "2px white" }}
                            animate={{ color: "white", WebkitTextStroke: "0px white" }}
                            transition={{ duration: 1, delay: 1 }}
                        >
                            PHA5E
                        </motion.span>
                    </motion.span>
                </motion.div>
            ) : (
                // Hero Section Appears After Animation
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    <div className="hero-text">
                        {["MARSEILLE", "—PARIS", "A WARM", "AND", "DYNAMIC", "—TEAM"].map((text, index) => (
                            <motion.span
                                key={index}
                                style={{ display: "block", width: "100%", textAlign: "center" }}
                                initial={{ opacity: 0, y: 30, scaleX: 0.8 }}
                                animate={{ opacity: 1, y: 0, scaleX: 1 }}
                                whileHover={{ scaleX: 1.2 }}
                                transition={{ duration: 1, ease: "easeOut", delay: 0.2 * (index + 1) }}
                            >
                                {text}
                            </motion.span>
                        ))}
                    </div>

                    {/* 🖼️ Images with Motion Effects */}
                    <motion.img
                        src={bigImage}
                        className="image-top-left"
                        style={{ x: bigImageMotion.xMove, y: bigImageMotion.yMove }}
                        onMouseMove={bigImageMotion.handleMouseMove}
                        onMouseLeave={bigImageMotion.handleMouseLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    />

                    <motion.img
                        src={capImage}
                        className="image-bottom-right"
                        style={{ x: capImageMotion.xMove, y: capImageMotion.yMove }}
                        onMouseMove={capImageMotion.handleMouseMove}
                        onMouseLeave={capImageMotion.handleMouseLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.7 }}
                    />

                    {/* 🆕 New Images Added */}
                    <motion.img
                        src={maxImage}
                        className="image-top-right"
                        style={{ x: topRightImageMotion.xMove, y: topRightImageMotion.yMove }}
                        onMouseMove={topRightImageMotion.handleMouseMove}
                        onMouseLeave={topRightImageMotion.handleMouseLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 0.9 }}
                    />

                    <motion.img
                        src={lucasImage}
                        className="image-bottom-left"
                        style={{ x: bottomLeftImageMotion.xMove, y: bottomLeftImageMotion.yMove }}
                        onMouseMove={bottomLeftImageMotion.handleMouseMove}
                        onMouseLeave={bottomLeftImageMotion.handleMouseLeave}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: 1.1 }}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default Hero;
