import { useEffect, useState } from "react";

const generateRandomGradient = () => {
    const colors = [
        "#fdfdfd", "#f5f5f5", "#e5e5e5",
        "#d4d4d4", "#cfcfcf", "#bbbbbb",
    ];
    const pick = () => colors[Math.floor(Math.random() * colors.length)];
    return `linear-gradient(135deg, ${pick()}, ${pick()})`;
};

export default function AnimatedBackground() {
    const [gradient, setGradient] = useState(generateRandomGradient());
    const [position, setPosition] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setGradient(generateRandomGradient());
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const onScroll = () => {
            setPosition(window.scrollY * 0.15); // parallax movement
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div
            className="absolute inset-0 -z-10 transition-all duration-1000 ease-in-out bg-cover bg-center"
            style={{
                backgroundImage: gradient,
                backgroundSize: "200% 200%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: `center ${position}px`,
            }}
        />
    );
}
