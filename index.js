const { NlpManager } = require('node-nlp'); // Correct class name
const express = require('express')
const manager = new NlpManager({ languages: ['en'] }); // Correct usage
const app = express();

// Add documents
manager.addDocument('en', 'hello', 'greeting');
manager.addDocument('en', 'hi', 'greeting');
manager.addDocument('en', 'hey you', 'greeting');
manager.addDocument('en', 'yo', 'greeting');
manager.addDocument('en', 'good morning', 'greeting');
manager.addDocument('en', 'good noon', 'greeting');
manager.addDocument('en', 'good day', 'greeting');
manager.addDocument('en', 'good bye for now', 'greetings.bye');
manager.addDocument('en', 'bye bye take care', 'greetings.bye');
manager.addDocument('en', 'OKAY!! See you later', 'greetings.bye');
manager.addDocument('en', 'Bye for now', 'greetings.bye');
manager.addDocument('en', 'I must go', 'greetings.bye');

// Add answers
manager.addAnswer('en', 'greeting', 'Heyy!!😎😎');
manager.addAnswer('en', 'greeting', 'Heyy there!!😍😍');
manager.addAnswer('en', 'greeting', 'Hi!!👏👏');
manager.addAnswer('en', 'greeting', 'Yo Wats Uppp!!🕺🕺💃💃');
manager.addAnswer('en', 'greetings.bye', 'Till next time🚶‍♂️🚶‍♂️');
manager.addAnswer('en', 'greetings.bye', 'See you soon🙈🙈');


// Train the model
manager.train().then(async() => {
    manager.save();
    //route and handler
    app.get('/bot', async(req, res) => {
        let response = await manager.process('en', req.query.message);
        res.send(response.answer || 'Please rephrase')
    })
 
    app.listen(3000);
   
});
