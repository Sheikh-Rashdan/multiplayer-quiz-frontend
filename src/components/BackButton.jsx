import { Link } from "react-router";
import { ChevronLeftCircle } from "@boxicons/react";
import "./BackButton.css";

function BackButton({ destination }) {
    return (
        <Link to={destination}>
            <button
                className="backButton"
            >
                <ChevronLeftCircle pack="filled" />
            </button>
        </Link>
    );
}

export default BackButton;