const processPostback = require('../process1/postback')
module.exports = function (app, chalk) {
    app.get('/webhook', function (req, res) {
        let VERIFY_TOKEN = "chegu123$"

        // Parse the query params
        let mode = req.query['hub.mode'];
        let token = req.query['hub.verify_token'];
        let challenge = req.query['hub.challenge'];

        // Checks if a token and mode is in the query string of the request
        if (mode && token) {

            // Checks the mode and token sent is correct
            if (mode === 'subscribe' && token === VERIFY_TOKEN) {

                // Responds with the challenge token from the request
                console.log('WEBHOOK_VERIFIED');
                res.status(200).send(challenge);

            } else {
                // Responds with '403 Forbidden' if verify tokens do not match
                res.sendStatus(403);
            }
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