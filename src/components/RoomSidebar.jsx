import nohootLogo from "../assets/nohoot_1x.png";

function RoomSidebar({ room, hostName, quiz, getPlayer }) {

  const roomId = room?.id;
  const quizName = quiz?.name;
  const playerCount = Object.keys(room?.player_ids ?? {}).length;
  const playerNames = Object.keys(room?.player_ids ?? {}).map(([player_id]) => getPlayer(player_id));
  const playerScores = Object.values(room?.player_ids ?? {})

  return (
    <div className="secondaryCard roomSidebarContainer">
    </div>
  );
}

export default RoomSidebar;