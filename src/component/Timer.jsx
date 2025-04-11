import React, { useState, useEffect } from "react";

const Timer = ({ active, reset }) => {
    const [time, setTime] = useState(0);

    useEffect(() => {
        let interval;
        if (active) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [active]);

    useEffect(() => {
        setTime(0);
    }, [reset]);

    const formatTime = (time) => {
        const minutes = String(Math.floor(time / 60)).padStart(2, "0");
        const seconds = String(time % 60).padStart(2, "0");
        return `${minutes}:${seconds}`;
    };

    return <div className="timer">{formatTime(time)}</div>;
};

export default Timer;
