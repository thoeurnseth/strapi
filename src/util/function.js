function sendOtp(sender,phone,content,privateKey,secretKey){

    const axios = require('axios');
    let data = JSON.stringify({
        "sender": "SMS Info",
        "to": "855972013150",
        "content": "hello test"
    });

    let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://cloudapi.plasgate.com/rest/send?private_key=0txC2X0i8NLQtdTvaIjAKNZUEiYmT2lUp5I1B0hvI3vztpFLL7_xHKEtLDD1X8gdOIOGkeAtOmF_vRJ1J3qJVg',
        headers: { 
            'X-Secret': '$5$rounds=535000$nSaMfYZ/74n/OK0P$GfulvbF2CkiI4cSPBrfBdA3gyylTVNyqHCEQFPc1/VB', 
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

function verifyOtp(){

}

module.exports = {
    sendOtp,
    verifyOtp,
}