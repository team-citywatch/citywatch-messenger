// @flow
'use strict';

// import { city_watch_issues, image_buttons, yes_no_buttons } from './utils';
const city_watch_issues = [
    {
        "type": "postback",
        "title": "Pothole",
        "payload": "pothole",
    },
    {
        "type": "postback",
        "title": "Violence",
        "payload": "violence",
    },
    {
        "type": "postback",
        "title": "Burst sewage pipe",
        "payload": "sewage",
    }
];

const image_buttons = [
    {
        "type": "postback",
        "title": "Yes!",
        "payload": "upload",
    },
    {
        "type": "postback",
        "title": "No!",
        "payload": "no_image",
    }
];

const yes_no_buttons = [
    {
        "type": "postback",
        "title": "Yes!",
        "payload": "yes_image",
    },
    {
        "type": "postback",
        "title": "No!",
        "payload": "no",
    }
];

// Imports dependencies and set up http server
const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()), // creates express http server
    PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN,
    request = require('request');

// Sets server port and logs message on success
app.listen(process.env.PORT || 3000, () => console.log('Webhook is listening'));

// Creates the endpoint for our webhook 
app.post('/webhook', (req, res) => {

    let body = req.body;

    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the message. entry.messaging is an array, but 
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);

            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }

});


function handleMessage(sender_psid, received_message) {

    let response;

    // console.log(received_message)

    // Check if the message contains text
    if (received_message.text == "Start" || received_message.text == "start") {
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": `Let's start:\nWhat do you want to report?`,
                        "subtitle": "Tap a button to answer.",
                        "buttons": city_watch_issues,
                    }]
                }
            }
        }
    } else if (received_message.text) {

        // Create the payload for a basic text message
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an image!`
        }
    } else if (received_message.attachments[0].type == 'image') {

        // Gets the URL of the message attachment
        let attachment_url = received_message.attachments[0].payload.url;

        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Is this the right picture?",
                        "subtitle": "Tap a button to answer.",
                        "image_url": attachment_url,
                        "buttons": yes_no_buttons,
                    }]
                }
            }
        }
    } else if (received_message.attachments[0].type == 'location') {
        response = { "text": "We're done here. Thanks!" }

        // Check if there's something similar in that location
    }

    // Sends the response message
    callSendAPI(sender_psid, response);
}


function handlePostback(sender_psid, received_postback) {
    let response;

    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'upload') {
        response = { "text": "Please upload the image" }
    } else if (payload === 'no_image' || payload === 'yes_image') {
        response = {
            "text": image_message(payload),
            "quick_replies": [
                {
                    "content_type": "location"
                }
            ]
        }
    } else if (city_watch_issues_elements().includes(payload)) {
        response = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "generic",
                    "elements": [{
                        "title": "Terrible! Do you have a picture for this?",
                        "subtitle": "Tap a button to answer.",
                        "buttons": image_buttons,
                    }]
                }
            }
        }
    } else if (payload === 'no') {
        response = { "text": "Oops, try uploading another image" }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}


function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

function image_message(payload) {
    if (payload === 'no_image') {
        return "No problem. Where is this issue?"
    } else {
        return "Great! Thanks. Where is this issue?"
    }
}

function city_watch_issues_elements() {
    var elements = []
    for (let [key, value] of Object.entries(Object.values(city_watch_issues))) {
        elements.push(value.payload)
    }
    return elements
}


// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = process.env.VERIFY_TOKEN

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
