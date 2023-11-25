const express=require('express');
const router=express.Router();
const check=require('../model/CheckIn');

router.get('/api/checked', async (req, res) => {
    try {
        const cIN = await check.find().select({ __v: 0, _id: 0 });
        res.json(cIN);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});




router.post('/api/checked/:checkIn/:feel', async (req, res) => {
    const currentTime = new Date().toLocaleTimeString();
    const c = new check({
        Time: currentTime,
        CheckedIn: req.params.checkIn,
        Feeling: req.params.feel,
    });
    try {
        const newCheck = await c.save();
        res.status(201).json(newCheck);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/api/checked/:id', async (req, res) => {
    try {
        const c = await check.findOne(req.params.id);
        const newC = await c.deleteOne();
        res.status(201).json(newC);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.put('/api/checked/:id', async (req, res) => {
    try {
        const c = await check.findById(req.params.id);
        c.Time = req.body.Time;
        c.CheckedIn = req.body.CheckedIn;
        const newC = await c.save();
        res.status(201).json(newC);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = (router);