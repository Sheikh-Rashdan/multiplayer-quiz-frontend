import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Contexts";
import { useContext } from "react";
import { HomeAdd, DoorOpenAlt, ArrowOutLeftSquareHalf } from "@boxicons/react";
import "./SelectionScreen.css";
import nohootLogo from "../assets/nohoot_2x.png"

function SelectionScreen() {
    const navigate = useNavigate();
    const { setAuthToken } = useContext(AuthContext);

    function logOut() {
        setAuthToken(null);
        localStorage.removeItem("authToken")
        navigate("/login");
    }

    return (
        <>
            <button
                className="secondaryButton logoutButton"
                onClick={logOut}
            >
                <p>Logout</p>
                <ArrowOutLeftSquareHalf pack="filled" />
            </button>
            <div className="parentContainer selectionScreen">
                <img src={nohootLogo} className="logoImage2x" />
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
            </div>
            <p className="creatorLabel">
                <a href="https://github.com/Sheikh-Rashdan" target="_blank">
                    Made by <span>Sheikh-Rashdan</span>
                </a>
            </p>
        </>
    );
}

export default SelectionScreen;