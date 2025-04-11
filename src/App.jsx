import Card from "./component/Card";
import img1 from "./assets/1.jpg";
import img2 from "./assets/2.jpg";
import img3 from "./assets/3.jpg";
import img4 from "./assets/4.jpg";
import img5 from "./assets/5.jpg";
import img6 from "./assets/6.jpg";
import img7 from "./assets/7.jpg";
import img8 from "./assets/8.jpg";
import img9 from "./assets/9.jpg";
import img10 from "./assets/10.jpg";
import img11 from "./assets/11.jpg";
import img12 from "./assets/12.jpg";
import img13 from "./assets/13.jpg";
import img14 from "./assets/14.jpg";
import img15 from "./assets/15.jpg";
import img16 from "./assets/16.jpg";
import { useEffect, useState } from "react";
import Timer from "./component/Timer";

const imgArray = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 },
    { id: 8, image: img8 },
    { id: 9, image: img9 },
    { id: 10, image: img10 },
    { id: 11, image: img11 },
    { id: 12, image: img12 },
    { id: 13, image: img13 },
    { id: 14, image: img14 },
    { id: 15, image: img15 },
    { id: 16, image: img16 },
];

function App() {
    const [images, setImages] = useState([]);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(true);
    const [timerActive, setTimerActive] = useState(false);
    const [restart, setRestart] = useState(false);
    const [win, setWin] = useState(false);

    useEffect(() => {
        getShuffledPairs();
    }, []);
    const getShuffledPairs = (array = imgArray, count = 8) => {
        const selected = [...array]
            .sort(() => 0.5 - Math.random())
            .slice(0, count);
        const pairedArray = [...selected, ...selected];
        pairedArray.sort(() => 0.5 - Math.random());

        setImages(
            pairedArray?.map((item, index) => ({
                ...item,
                active: false,
                index,
            }))
        );
    };

    const handleClick = (index) => {
        const clickedImage = images[index];
        if (selected && clickedImage.id === selected.id) {
            const newImages = [...images];
            newImages[index].active = true;
            setImages(images);
            setSelected(null);
            if (newImages.every((item) => item.active)) {
                setTimerActive(false);
                setWin(true);
                setShowModal(true);
                getShuffledPairs();
            }
        } else {
            const newImages = images?.map((item) => ({
                ...item,
                active:
                    item.index === selected?.index
                        ? false
                        : item?.index === index
                        ? true
                        : item?.active,
            }));
            setImages(newImages);
            setSelected(clickedImage);
        }
    };

    const handleStart = () => {
        setShowModal(false);
        setTimerActive(true);
        setRestart(() => false);
        setRestart(() => true);
    };

    return (
        <>
            {showModal && (
                <div className="modal" onClick={handleStart}>
                    <button>{win ? "Restart" : "Play"}</button>
                </div>
            )}
            <Timer active={timerActive} />
            <div className="container">
                {images?.map((item, index) => (
                    <Card
                        key={index}
                        image={item?.image}
                        onClick={() => handleClick(index)}
                        active={item?.active}
                    />
                ))}
            </div>
        </>
    );
}

export default App;
