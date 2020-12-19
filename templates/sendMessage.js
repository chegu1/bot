const request = require('request');
module.exports = function sendMessage(recipientId, message) {

    return new Promise(function (resolve, reject) {
        request({
            url: "https://graph.facebook.com/v2.6/me/messages",
            qs: { access_token: 'EAAC7rfotrGoBABTro1jZCxFoUIsqTKO6GZBg2SNjXsRq0ogsAi0lcyZAbaEkCW9NOBals8XKXBw4bziahdmj6PWu2ZBEliJmOyvZAh4K1ydci6HesTRWKHsxPR0iHgCsZBqlNS9vIOL9Cews4UhZCryy8WqDDsOBSa8QIFkdW2ZC8l50G4fa9IbRRg7EjvoWsdQZD' },
            method: "POST",
            json: {
                recipient: { id: recipientId },
                message: message,
            }
        }, function (error, response, body) {
            if (error) {
                console.log("Error sending message: " + response.error);
                reject(response.error);
            } else {
                resolve(body);
            }
        });
    })
}