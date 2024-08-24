const express = require('express');
const router = express.Router();

let envelopes = [];
let totalBudget = 0;

router.param('id', (req, res, next, id)=>{
    const envelope = envelopes.find(env=>env.id===Number(id))

    if (!envelope){
        return res.status(404).send({message: 'Envelope not found.'})
    }

    req.envelope = envelope;
    next();
})

router.post('/create', (req, res)=>{
    const {title, budget} = req.body;

    if (!title || budget === undefined) {
        return res.status(400).send({ message: 'Title and budget are required.' });
    }

    const id = envelopes.length + 1;
    envelopes.push({ id, title, budget });

    totalBudget += budget;

    res.status(201).send({
        message: 'Envelope created successfully.',
        envelope: { id, title, budget },
        totalBudget
    });
})

router.get('/', (req, res) =>{
    res.send(envelopes)
})

router.get('/:id', (req, res) =>{
   
    res.status(200).send({
        message: 'Envelope retrieved successfully',
        envelope: req. envelope
    })
})

router.put('/:id', (req, res)=>{

    const envelope = req.envelope;
    const {title, budget, extractAmount} = req.body;
    if (title){
        envelope.title = title;
    }

    if (budget !== undefined){
        totalBudget -= envelope.budget;
        envelope.budget = budget;
        totalBudget += budget;
    }

    if (extractAmount !== undefined){
        if (extractAmount > envelope.budget){
            return res.status(400).send({message: "Insufficient funds in envelope"})
        }

        envelope.budget -= extractAmount;
        totalBudget -= extractAmount;
    }

    res.status(200).send({message: 'Envelope updated successfully',
envelope,
totalBudget});


});

router.delete('/:id', (req, res)=>{
    const envelopeId = Number(req.params.id);
    const envelope = req.envelope;
    totalBudget -= envelope.budget;

    envelopes = envelopes.filter(env => env.id !== envelopeId);

    res.status(200).send({
        message:'Envelope deleted successfully',
        remainingEnvelopes: envelopes,
        totalBudget
    });
})

router.post('/transfer/:from/:to', (req, res)=>{
    const fromEnvelope = envelopes.find(env=>env.title===req.from);
    const toEnvelope = envelopes.find(env=>env.title===req.to);
    const {amount} = req.body;

    if (!amount || amount <= 0){
        return res.status(400).send({message:"Transfer amount must be a positive number."})
    }

    if (amount>fromEnvelope.budget){
        return res.status(400).send({message:"Insufficient funds in the source envelope"})

    }

    fromEnvelope.budget -= amount;
    toEnvelope.budget += amount;

    res.status(200).send({
        message: 'Transferred successfull',
        fromEnvelope,
        toEnvelope,
        totalBudget
    })
})

module.exports = router;