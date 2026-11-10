import { Copy, DoorOpenAlt } from "@boxicons/react";
import nohootLogo from "../assets/nohoot_1x.png";
import "./RoomSidebar.css";
import { useNavigate } from "react-router";

function RoomSidebar({ room, hostName, quiz, getPlayer, me }) {

  const navigate = useNavigate();

  const roomId = room?.id;
  const quizName = quiz?.name;
  const playerCount = Object.keys(room?.player_ids ?? {}).length;
  const playerNames = Object.keys(room?.player_ids ?? {}).map(player_id => getPlayer(player_id));
  const playerScores = Object.values(room?.player_ids ?? {})

  return (
    <div className="secondaryCard roomSidebarContainer">
      <img src={nohootLogo} />
      <div className="spacer desktop" />
      <div className="spacer desktop" />
      <div className="roomCodeContainer">
        <p>{roomId}</p>
        <Copy
          pack="filled"
          className="roomCodeCopyIcon"
          onClick={() => window.navigator.clipboard.writeText(roomId)}
        />
      </div>
      <p style={{ textAlign: "center", fontWeight: "300" }}>{quizName} by {hostName}</p>
      <div className="spacer" />
      <p style={{ fontSize: "1.8rem" }} className="desktop">Players: {playerCount}</p>
      <div className="playerScoreContainer">
        {playerNames.map((name, index) => (
          <div key={index} className="playerScoreCard">
            <p data-highlight={me?.username == name}>{name}</p>
            <p data-highlight={me?.username == name}>{playerScores[index]}</p>
          </div>
        ))}
      </div>
      <button
        className="secondaryButton fillWidth exitButton"
        onClick={() => navigate("/home")}
      >
        <p>Exit</p>
        <DoorOpenAlt pack="filled" />
      </button>
    </div>
  );
}

export default RoomSidebar;