const request = require('request');
const senderAction = require('../templates/senderAction')
const sendMessage = require('../templates/sendMessage');
const processPostback = (event) => {
    const senderID = event.sender.id;
    const payload = event.postback.payload;
    if (payload === 'WELCOME') {
        request({
            url: "https://graph.facebook.com/v2.6/" + senderID,
            qs: {
                access_token: 'EAAC7rfotrGoBAJ5XnbuPrwiqyZBLhNyRtoynSV7T4uxOya8ZBowpY8kvPdGuxhZBkUcGtlVgzPgYxuzk5pEtZAQwNxwrcrfZACs5Gks5ZBY5AYSXzP4mWFn0YZAAog3RkNovP2sqdg2ZANdlYi9v1BA0lSx8e50J9aCq0eZA3Y6aa3ATZCthZC0uFourDZC6pLC9GzYZD',
                fields: "first_name"
            },
            method: "GET"
        }, function (error, response, body) {
            let greeting = '';
            if (error) {
                console.error("Error getting user name: " + error);
            } else {
                let bodyObject = JSON.parse(body);
                console.log(bodyObject);
                name = bodyObject.first_name;
                greeting = "Hello " + name + ". ";
            }
            let message = greeting + "Welcome to Healthbot. Hope you are       doing good today";
            let message2 = "I am your nutrition tracker :-)"
            let message3 = "please type in what you ate like: I ate chicken birayani and 2 chapatis with dal.";
            senderAction(senderID);
            sendMessage(senderID, { text: message }).then(() => {
                sendMessage(senderID, { text: message2 }).then(() => {
                    sendMessage(senderID, { text: message3 }).then(() => {
                        sendMessage(senderID, { text: '🎈' });
                    })
                });
            });
        });
    }
}

module.exports = processPostback;