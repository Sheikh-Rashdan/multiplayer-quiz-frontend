import { Link } from "react-router";

import { HomeAdd, DoorOpenAlt } from "@boxicons/react";
import "./SelectionScreen.css";

function SelectionScreen() {
    return (
        <>
            <div className="selectionDiv">
                <Link to="/host" className="screenLink">
                    <button className="selectionButton">
                        <HomeAdd pack="filled" className="icon" />
                        <p>Host</p>
                    </button>
                </Link>
                <Link to="/join" className="screenLink">
                    <button className="selectionButton">
                        <DoorOpenAlt pack="filled" className="icon" />
                        <p>Join</p>
                    </button>
                </Link>
            </div>
        </>
    );
}

export default SelectionScreen;