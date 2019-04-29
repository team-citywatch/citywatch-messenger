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
        "payload": "yes_image",
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
        "payload": "yes",
    },
    {
        "type": "postback",
        "title": "No!",
        "payload": "no",
    }
];

module.exports = { city_watch_issues, image_buttons, yes_no_buttons };
