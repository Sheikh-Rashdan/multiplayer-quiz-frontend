
import { HomeAdd, DoorOpenAlt } from "@boxicons/react";
import "./SelectionScreen.css";

function SelectionScreen() {
    return (
        <>
            <div className="selectionDiv">
                <button className="selectionButton">
                    <HomeAdd pack="filled" className="icon" />
                    <p>Host</p>
                </button>
                <button className="selectionButton">
                    <DoorOpenAlt pack="filled" className="icon" />
                    <p>Join</p>
                </button>
            </div>
        </>
    );
}

export default SelectionScreen;