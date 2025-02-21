import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import "./Hero.css";
import bigImage from "../assets/big.png";
import capImage from "../assets/cap.jpg";
import maxImage from "../assets/max.jpg";
import lucasImage from "../assets/lucas.jpg";

const Hero = () => {
    const [showHero, setShowHero] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null); // Track hovered image

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowHero(true);
        }, 3000);
        return () => clearTimeout(timeout);
    }, []);

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
    const topRightImageMotion = useImageMovement(200);
    const bottomLeftImageMotion = useImageMovement(200);

    return (
        <div className="hero-container">
            {!showHero ? (
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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    {/* Hero Text with Dynamic Z-Index and Outline Effect */}
                    <div
                        className="hero-text"
                        style={{
                            position: "relative",
                            zIndex: hoveredImage ? 1 : 2, // Move text behind images when hovering
                            color: hoveredImage ? "black" : "white", // Change text color to black on hover
                            WebkitTextStroke: hoveredImage ? "1px grey" : "0px grey", // White outline effect
                            opacity: hoveredImage ? 0.4 : 1, // Reduce opacity when text is in outline mode
                            transition: "opacity 0.3s ease-in-out, color 0.3s ease-in-out",
                        }}
                    >

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

                    {/* Images with Motion Effects */}
                    <motion.img
                        src={bigImage}
                        className="image-top-left"
                        style={{
                            x: bigImageMotion.xMove,
                            y: bigImageMotion.yMove,
                            opacity: hoveredImage === null || hoveredImage === "big" ? 1 : 0,
                            zIndex: hoveredImage === "big" ? 2 : 1,
                        }}
                        onMouseEnter={() => setHoveredImage("big")}
                        onMouseLeave={() => setHoveredImage(null)}
                        onMouseMove={bigImageMotion.handleMouseMove}
                    />

                    <motion.img
                        src={capImage}
                        className="image-bottom-right"
                        style={{
                            x: capImageMotion.xMove,
                            y: capImageMotion.yMove,
                            opacity: hoveredImage === null || hoveredImage === "cap" ? 1 : 0,
                            zIndex: hoveredImage === "cap" ? 2 : 1,
                        }}
                        onMouseEnter={() => setHoveredImage("cap")}
                        onMouseLeave={() => setHoveredImage(null)}
                        onMouseMove={capImageMotion.handleMouseMove}
                    />

                    <motion.img
                        src={maxImage}
                        className="image-top-right"
                        style={{
                            x: topRightImageMotion.xMove,
                            y: topRightImageMotion.yMove,
                            opacity: hoveredImage === null || hoveredImage === "max" ? 1 : 0,
                            zIndex: hoveredImage === "max" ? 2 : 1,
                        }}
                        onMouseEnter={() => setHoveredImage("max")}
                        onMouseLeave={() => setHoveredImage(null)}
                        onMouseMove={topRightImageMotion.handleMouseMove}
                    />

                    <motion.img
                        src={lucasImage}
                        className="image-bottom-left"
                        style={{
                            x: bottomLeftImageMotion.xMove,
                            y: bottomLeftImageMotion.yMove,
                            opacity: hoveredImage === null || hoveredImage === "lucas" ? 1 : 0,
                            zIndex: hoveredImage === "lucas" ? 2 : 1,
                        }}
                        onMouseEnter={() => setHoveredImage("lucas")}
                        onMouseLeave={() => setHoveredImage(null)}
                        onMouseMove={bottomLeftImageMotion.handleMouseMove}
                    />
                </motion.div>
            )}
        </div>
    );
};

export default Hero;
