import { Copy } from "@boxicons/react";
import nohootLogo from "../assets/nohoot_1x.png";
import "./RoomMain.css";

function RoomSidebar({ room, hostName, quiz, getPlayer }) {

  const roomId = room?.id;
  const quizName = quiz?.name;
  const playerCount = Object.keys(room?.player_ids ?? {}).length;
  const playerNames = Object.keys(room?.player_ids ?? {}).map(([player_id]) => getPlayer(player_id));
  const playerScores = Object.values(room?.player_ids ?? {})

  return (
    <div className="secondaryCard roomSidebarContainer">
      <img src={nohootLogo} />
      <div className="spacer" />
      <div className="spacer" />
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
      <p style={{ fontSize: "1.8rem" }}>Players: {playerCount}</p>
      <div className="playerScoreContainer">
        {playerNames.map((name, index) => (
          <div key={index} className="playerScoreCard">
            <p>{name}</p>
            <p>{playerScores[index]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RoomSidebar;