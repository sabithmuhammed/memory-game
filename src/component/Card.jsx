import bg from "../assets/bg.png";
const Card = ({ image, active, onClick }) => {
    return (
        <div
            className={`card-container ${active && `active`}`}
            onClick={onClick}
        >
            <div className="card">
                <div className="card-front">
                    <img src={bg} alt="" />
                </div>
                <div className="card-back">
                    <img src={image} alt="Card Back" />
                </div>
            </div>
        </div>
    );
};

export default Card;
