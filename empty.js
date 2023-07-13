const axios = require('axios');
axios.post('https://app.mysquid.io/api/v1/track', {
    project: "6480ea9e2cfb668a330b87a5",
    event: "identify",
    label: "recurring friend",
    context: {
        traits: {
            name: "tyler",
            email: "keyboard@swim.net"
        }
    }
})