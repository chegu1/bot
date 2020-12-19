const processPostback = require('../processes/postback');
module.exports = function (app, chalk) {
    app.get('/webhook', function (req, res) {
        console.log(req.query)
        if (req.query['hub.verify_token'] === 'EAAC7rfotrGoBAJ5XnbuPrwiqyZBLhNyRtoynSV7T4uxOya8ZBowpY8kvPdGuxhZBkUcGtlVgzPgYxuzk5pEtZAQwNxwrcrfZACs5Gks5ZBY5AYSXzP4mWFn0YZAAog3RkNovP2sqdg2ZANdlYi9v1BA0lSx8e50J9aCq0eZA3Y6aa3ATZCthZC0uFourDZC6pLC9GzYZD') {
            console.log('webhook verified');
            res.status(200).send(req.query['hub.challenge']);
        } else {
            console.error('verification failed. Token mismatch.');
            res.sendStatus(403);
        }
    });

    app.post('/webhook', function (req, res) {
        //checking for page subscription.
        if (req.body.object === 'page') {

            /* Iterate over each entry, there can be multiple entries 
            if callbacks are batched. */
            req.body.entry.forEach(function (entry) {
                // Iterate over each messaging event
                entry.messaging.forEach(function (event) {
                    console.log(event);
                    if (event.postback) {
                        processPostback(event);
                        console.log('postback')
                    } else if (event.message) {
                        // processMessage(event);
                        console.log('post message')
                    }
                });
            });
            res.sendStatus(200);
        }
    });
}