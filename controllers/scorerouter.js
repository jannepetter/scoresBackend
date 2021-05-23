const Score = require('../models/score')
const scorerouter = require('express').Router()
const bcryptjs = require('bcryptjs')

const MAXCOUNT = 50

scorerouter.get('/', async (req, res) => {
    try {
        console.log(req.body)
        const scoret = await Score.find({})
        res.json(scoret)
    } catch (error) {
        console.log(error.message)
    }

})

scorerouter.post('/', async (req, res) => {
    try {
        const correct = await bcryptjs.compare(process.env.ID, req.headers.id)
        if (!correct) {
            res.status(400).json({ message: "something went wrong" })
        }

        const newscore = {
            gamename: req.body.gamename,
            scores: req.body.scores.slice(0, 10)        //max 10 scores per game
        }

        const allOldscores = await Score.find({})
        const amount = allOldscores.length
        const gameNameExists = allOldscores.some((g) => g.gamename === req.body.gamename)
        console.log(amount, gameNameExists, ' countti ja exists', req.body.gamename)

        //maxcount of games is enough in case someone is able and willing to bypass
        //the security and flood the db
        if (amount > MAXCOUNT) {
            throw new Error('Sorry we are full, try the other place')
        }
        if (gameNameExists) {
            const savedScore = await Score.findOneAndUpdate({ gamename: req.body.gamename },
                { $set: { ...newscore } }, { new: true })
            res.json(savedScore)

        } else {
            const score = new Score({ ...newscore })
            const savedScore = await score.save()
            res.json(savedScore)
        }
    } catch (error) {
        console.log('error while posting')
        res.status(404).json({ message: error.message })
    }
})

scorerouter.delete('/', async (req, res) => {
    try {
        const scoresName = req.body.scoresToDelete
        const correct = await bcryptjs.compare(process.env.ID, req.headers.id)
        if (!correct) {
            res.status(400).json({ message: "something went wrong" })
        }
        console.log(scoresName)
        const deletedScore = await Score.deleteOne({ gamename: scoresName })
        res.status(200).json(deletedScore)
    } catch (error) {
        console.log('error while deleting')
        res.status(404).json({ message: error.message })
    }
})

module.exports = scorerouter


