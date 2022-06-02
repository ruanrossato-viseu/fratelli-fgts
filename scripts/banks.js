
const process = require("process");
const { parse } = require("dotenv");
const axios = require("axios");
require("dotenv").config();



module.exports.simulation = async function simulation(cpf){
    cpf = cpf.replace(/\D/g,'');
    cpf = cpf.substr(0, 3) + "." + cpf.substr(3,6)+"."+cpf.substr(6,9)+"-"+cpf.substr(9);
    var data = JSON.stringify({
        "cpf": cpf,
        "source": "chatbot",
        "value": 0,
        "bankPan": true
    });

    var config = {
        method: 'post',
        url: 'https://tr5bceh9i1.execute-api.sa-east-1.amazonaws.com/DEV/simulation',
        headers: { 
            'x-api-key': '8HOhYvOk8z8AoMoPU6o0krG8IUKeVf38IvoHnTkb', 
            'Content-Type': 'application/json'
        },
        data : data
    };


    console.log(config)

    var simulationInfo = await axios(config)
        .then((response) => {
            console.log(JSON.stringify(response.data))
            return(response.data)
        })
        .catch( function(error){
            
            console.log(error);
            return false
        });
    
    

    return simulationInfo
}