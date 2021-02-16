import React, { useState ,useEffect} from "react";

const PlayerStatus = (props) => {
    const { players ,updatePlayer,match:{params:{id:gameId}} } = props;
    const [errors, setErrors] = useState([]);

    const buttonStyle=(playerStatus,buttonStatus)=>{
        return buttonStatus==="Playing"&&playerStatus==="Playing"?{color:'white',backgroundColor:'green'}
        :buttonStatus==="Not Playing"&&playerStatus==="Not Playing"?{color:'white',backgroundColor:'red'}
        :buttonStatus==="Undecided"&&playerStatus==="Undecided"?{color:'black',backgroundColor:'yellow'}
        :{color:'black',backgroundColor:'white'}
    }
    const handleStatusUpdate = playerUpdate=>{
        updatePlayer(playerUpdate)       
        .then(response=>response.errors?setErrors(response.errors):'')


    }
    useEffect(() => {
        return () => {
            setErrors([]);
        }
    }, [])

    return (
        <div>
            <p>
            {
                errors.length>0&&errors.map((err, index) => <small key={index} style={{color:"red"}}>{err}</small>)
            }
            </p>
            <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
            {players.sort((a,b) => (a.name > b.name) ? 1 :-1)
            .map((item,index)=>{
                return <tr key={index}>
                            <td>{item.name}</td>
                            <td>
                            <button style={buttonStyle(item['game'+gameId],"Playing")} onClick={(e)=>handleStatusUpdate({_id:item._id,['game'+gameId]:"Playing"})}>Playing</button>
                            <button style={buttonStyle(item['game'+gameId],"Not Playing")} onClick={(e)=>handleStatusUpdate({_id:item._id,['game'+gameId]:"Not Playing"})}>Not Playing</button>
                            <button style={buttonStyle(item['game'+gameId],"Undecided")} onClick={(e)=>handleStatusUpdate({_id:item._id,['game'+gameId]:"Undecided"})}>Undecided</button>
                            </td>
                        </tr>
            })}
            </tbody>
            </table>
 
        </div>
    )

}

export default PlayerStatus
