import React, {useState, useEffect} from "react"
import axios from "axios"
import {
    BrowserRouter as Router,
    Link,
    Redirect,
    Route, // for later
    useHistory,
  } from 'react-router-dom'
import PlayersList from '../components/PlayersList'
import PlayerForm from "../components/PlayerForm"
import PlayerStatus from "../components/PlayerStatus"
const Main = props => {
    const [players, setPlayers] = useState([])
    const [loaded,setLoaded]=useState(false);
    const history = useHistory();

    useEffect( () => {
        axios.get("http://localhost:8000/api/getAllplayers")
            .then(response => {setPlayers((response.data))
                                setLoaded(true)
                                })
            .catch(error => console.log("There was an issue: ", error))
    },[])
    const removeFromDom = playerId => {
        setPlayers(players.filter(player => player._id != playerId));
    }
    const addToDom= player=>{
        setPlayers(players.concat(player));
    }
    const updateDom = (playerId,update)=>{
        setPlayers(players.map((player,indx)=>{
            return player._id===playerId?update
            :player;
        }))

    }
    const createPlayer = player =>{
        return axios.post("http://localhost:8000/api/createNewPlayer",player)
            .then((response)=>{
                addToDom(response.data);
                history.push("/players/list");
                return {errors:[],success:response.data};
            }) 
            .catch(err =>{
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = []; // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                return {errors:errorArr,success:false};
            })
    }

    const deletePlayer = (playerId) => {
        axios.delete('http://localhost:8000/api/players/delete/' + playerId)
            .then(res => {
                removeFromDom(playerId)
            })
            .catch(err=>console.log(err))
    }
    const updatePlayer= (player)=>{
            let {_id:playerId} = player;
            delete player['_id'];
            return axios.put("http://localhost:8000/api/players/edit/"+playerId,player)
                .then((response) => {
                    updateDom(playerId,response.data);
                    return {errors:[],success:response.data};
                }
                )
                .catch(err =>{
                    const errorResponse = err.response.data.errors; 
                    const errorArr = []; 
                    for (const key of Object.keys(errorResponse)) { 
                        errorArr.push(errorResponse[key].message)
                    }
                    return {errors:errorArr,success:false};
                })
    
    
    }
    const gameNavStyle=(targetId,id)=>{
        if(id===targetId)
            return {color:'red'};
        else
            return{};
    }
    return(
        <div>
                    <Route exact path="/">
                        <Redirect to="/players/list"/>
                    </Route>
                    <Route exact path="/players">
                        <Redirect to="/players/list"/>
                    </Route>
                    <Route exact path="/status">
                        <Redirect to="/status/game/1"/>
                    </Route>
                    <Route exact path="/status/game">
                        <Redirect to="/status/game/1"/>
                    </Route>
                    {loaded&&
                    <Route 
                    path="/players"  
                    render={(props)=>(
                        <>
                            <div>
                                <Link to="/players/list" style={{color:'red'}}>Manage Players</Link> | <Link to="/status/game/1">Manage Player Status</Link>
                            </div>
                            <Route 
                            path={props.match.path+"/list"}  
                            render={(props)=>(
                                <>
                                    <div>
                                        <Link to="/players/list" style={{color:'red'}}>List</Link> | <Link to="/players/addplayer">Add Player</Link>
                                    </div>  
                                    <PlayersList {...props} players={players} deletePlayer={deletePlayer}/>
                                </>
                            )}/>
                            <Route 
                            path={props.match.path+"/addplayer"}  
                            render={(props)=>(
                                <>
                                    <div>
                                        <Link to="/players/list" >List</Link> | <Link to="/players/addplayer" style={{color:'red'}}>Add Player</Link>
                                    </div>
                                    <PlayerForm onSubmitProp={createPlayer} {...props}/>
                                </>
                            )}/>
                        </>
                        )}
                    />}

                    {loaded&&
                    <Route  
                    path="/status/game"  
                    render={(props)=>(
                        <>
                            <div>
                                <Link to="/players/list" >Manage Players</Link> | <Link to="/status/game/1" style={{color:'red'}}>Manage Player Status</Link>
                            </div>
                            <Route path={props.match.path+"/:id"}   
                                render={(props)=>(
                                <>
                                <div>
                                    <Link to="/status/game/1" style={gameNavStyle("1",props.match.params.id)}>Game 1</Link> | <Link to="/status/game/2" style={gameNavStyle("2",props.match.params.id)}>Game 2</Link> | <Link to="/status/game/3" style={gameNavStyle("3",props.match.params.id)}>Game 3</Link> 
                                </div>
                                <PlayerStatus   {...props} updatePlayer={updatePlayer} players={players}/>
                                
                                </>
                                
                            )}/>
                        </>
                        )}
                    />}
                    

        </div>
    )

}

export default Main
