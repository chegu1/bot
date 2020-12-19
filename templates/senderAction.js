const request = require('request');
module.exports = function senderAction(recipientId) {
    request({
        url: "https://graph.facebook.com/v2.6/me/messages",
        qs: { access_token: 'EAAC7rfotrGoBAJ5XnbuPrwiqyZBLhNyRtoynSV7T4uxOya8ZBowpY8kvPdGuxhZBkUcGtlVgzPgYxuzk5pEtZAQwNxwrcrfZACs5Gks5ZBY5AYSXzP4mWFn0YZAAog3RkNovP2sqdg2ZANdlYi9v1BA0lSx8e50J9aCq0eZA3Y6aa3ATZCthZC0uFourDZC6pLC9GzYZD' },
        method: "POST",
        json: {
            recipient: { id: recipientId },
            "sender_action": "typing_on"
        }
    }, function (error, response, body) {
        if (error) {
            console.log("Error sending message: " + response.error);
        }
    });
}