const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema({
    gamename: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    scores: [{
        playername: {
            type: String,
            maxlength: 20
        },
        score: {
            type: String,
            maxlength: 20
        }
    }]
})
scoreSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Score', scoreSchema)