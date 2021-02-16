const { Player } = require('../models/player.model');

module.exports.createPlayer = (request, response) => {
    Player.create(request.body)
        .then(Player => response.json(Player))
        .catch(err => response.status(400).json(err));
}
module.exports.findAllPlayers = (request, response) => {
    Player.find({})
        .then(allPlayers => response.json(allPlayers))
        .catch(err => response.json(err));
}
module.exports.getSinglePlayerById=(request, response) => {
    Player.findOne({_id:request.params.id})
        .then(allPlayers => response.json(allPlayers))
        .catch(err => response.status(404).json({errors:{notFound:{message:"We're sorry, but we could not find the Player you are looking for. Would you like to add this Player to our database?"}}}));
}
module.exports.editPlayerById=(request, response) => {
    Player.findOneAndUpdate({ _id: request.params.id }, request.body, { new:true, runValidators: true })
        .then(updatedPlayer => {response.json(updatedPlayer);})
        .catch(err => response.status(400).json(err));
}
module.exports.deletePlayer = (request, response) => {
    Player.deleteOne({ _id: request.params.id })
        .then(deleteConfirmation => response.json(deleteConfirmation))
        .catch(err => response.json(err))
}
