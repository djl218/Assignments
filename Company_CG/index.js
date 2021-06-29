const express = require('express');
const app = express();

app.use(express.json());

let trainers = [
    {
      id: "trainer-id-000001",
      email: "trainer1@cg.com",
      phone: "5125125120",
      firstName: "Fearless",
      lastName: "Contender",
      date: "2019-05-30T17:30:31.098Z",
    },
    {
        id: "trainer-id-000002",
        email: "trainer2@cg.com",
        phone: "8675309",
        firstName: "Heroic",
        lastName: "Participant",
        date: "2019-05-30T17:30:31.098Z",
    },
    {
        id: "trainer-id-000003",
        email: "trainer3@cg.com",
        phone: "123456789",
        firstName: "Brave",
        lastName: "Competitor",
        date: "2019-05-30T17:30:31.098Z",
    }
];

app.get('/', (request, response) => {
    response.send('<h1>Company CG</h1>');
});
  
app.get('/api/trainers', (request, response) => {
    response.json(trainers);
});

app.get('/api/trainers/:id', (request, response) => {
    const id = request.params.id;
    const trainer = trainers.find(trainer => trainer.id === id);
    if (trainer) {
        response.json(trainer);
    } else {
        response.status(404).end();
    }
});

app.delete('/api/trainers/:id', (request, response) => {
    const id = request.params.id;
    trainers = trainers.filter(trainer => trainer.id !== id);

    response.status(204).end();
});

const generateId = () => {
    let newId = 'trainer-id-';
    let newEndDigits = 0;
    for (let i = 0; i < trainers.length; i++) {
        const stringId = trainers[i].id;
        const numId = Number(stringId.slice(newId.length));
        newEndDigits = Math.max(newEndDigits, numId);
    }
    newEndDigits++;

    const numZeros = 6 - newEndDigits.toString().length;
    for (let i = 0; i < numZeros; i++) {
        newId = newId.concat('0');
    }

    newId = newId.concat(newEndDigits);
    return newId;
}

app.post('/api/trainers', (request, response) => {
    const body = request.body;

    if (!body.email) {
        return response.status(400).json({ 
            error: 'email missing' 
        });
    }
    if (!body.phone) {
        return response.status(400).json({
            error: 'phone number missing'
        });
    }
    if (!body.firstName) {
        return response.status(400).json({
            error: 'first name missing'
        });
    }
    if (!body.lastName) {
        return response.status(400).json({
            error: 'last name missing'
        });
    }

    const newTrainer = {
        id: generateId(),
        email: body.email,
        phone: body.phone,
        firstName: body.firstName,
        lastName: body.lastName,
        date: new Date()
    }

    trainers = trainers.concat(newTrainer);
    response.json(newTrainer);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});