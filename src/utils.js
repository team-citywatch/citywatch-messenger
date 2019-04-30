const city_watch_issues = [
    {
        "content_type": "text",
        "title": "Transportation",
        "payload": "transportation",
    },
    {
        "content_type": "text",
        "title": "Public Safety",
        "payload": "public safety",
    },
    {
        "content_type": "text",
        "title": "Services",
        "payload": "services",
    },
    {
        "content_type": "text",
        "title": "Environment",
        "payload": "environment",
    }
];

const public_safety_issues = [
    {
        "type": "postback",
        "title": "Violence",
        "payload": "violence",
    },
    {
        "type": "postback",
        "title": "Fire",
        "payload": "fire",
    },
    {
        "type": "postback",
        "title": "Safety",
        "payload": "safety",
    }
]

const transport_issues = [
    {
        "type": "postback",
        "title": "Potholes",
        "payload": "potholes",
    },
    {
        "type": "postback",
        "title": "Blockage",
        "payload": "blockage",
    }
]

const environment_issues = [
    {
        "type": "postback",
        "title": "Noise",
        "payload": "noise",
    },
    {
        "type": "postback",
        "title": "Garbage",
        "payload": "garbage",
    },
    {
        "type": "postback",
        "title": "Dirty Water",
        "payload": "dirty_water",
    },
    {
        "type": "postback",
        "title": "Air Pollution",
        "payload": "air_pollution",
    }
]

const services_issues = [
    {
        "type": "postback",
        "title": "HealthCare",
        "payload": "healthcare",
    },
    {
        "type": "postback",
        "title": "Benefits",
        "payload": "benefits",
    },
    {
        "type": "postback",
        "title": "Police",
        "payload": "police",
    }
]

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

module.exports = { city_watch_issues, image_buttons, yes_no_buttons, public_safety_issues, transport_issues, environment_issues, services_issues };
