import { useState } from "react";
export default function Player({initialName, symbol, isActive, onChangeName}){
  const[isEditing, setEditing]= useState(false);
  const[playerName, setPlayerName]=useState(initialName);

function handleEditClick(){
  setEditing((editing)=>!editing);
  if(isEditing){
onChangeName(symbol, playerName);
  }
  

}
function handleChange(event){
  setPlayerName(event.target.value);

}
let editablePlayerName=<span className="player-name">{playerName}</span>;
// let btnCaption="Edit";
if(isEditing){
  editablePlayerName=<input type="text" required value={playerName} onChange={handleChange}/>
  // btnCaption="Save";
}
  return (  <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>

        </li>
        );
}

