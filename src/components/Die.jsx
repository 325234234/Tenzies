export default function Die({ value, isHeld, onClick }) {
    return (
        <div className="die" style={{background: isHeld ? "#59E391" : ""}} onClick={onClick}>
            <p className="die-face">{value}</p>
        </div>
    )
}