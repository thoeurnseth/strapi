async function sendOtp(plusgate){
    const axios = require('axios');
    let data = JSON.stringify({
        "sender": ""+plusgate.sender+"",
        "to": "855972013150",
        "content": ""+plusgate.content+""
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cloudapi.plasgate.com/rest/send?private_key='+plusgate.privateKey+'',
        headers: { 
            'X-Secret': ''+plusgate.secretKey+'', 
            'Content-Type': 'application/json'
        },
        data : data
    };

    axios.request(config)
    .then((response) => {
        console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
        console.log(error);
    });
}

async function verifyOtp(){

}

module.exports = {
    sendOtp,
    verifyOtp,
}