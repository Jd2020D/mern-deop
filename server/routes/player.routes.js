const PlayerController = require('../controllers/Player.controller');
module.exports = function(app){
    app.post('/api/createNewPlayer', PlayerController.createPlayer);
    app.get('/api/getAllPlayers', PlayerController.findAllPlayers);
    app.get('/api/players/:id', PlayerController.getSinglePlayerById);
    app.put('/api/players/edit/:id', PlayerController.editPlayerById);
    app.delete('/api/players/delete/:id', PlayerController.deletePlayer);

}