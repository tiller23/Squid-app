const axios = require('axios');
axios.post('https://app.mysquid.io/api/v1/track', {
    project: "project_key",
    event: "event_ID",
    label: "example_label",
    context: {
        traits: {
            name: "username",
            email: "example@abc.com"
        }
    }
})