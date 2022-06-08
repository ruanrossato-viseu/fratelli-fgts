
const process = require("process");
const { parse } = require("dotenv");
const axios = require("axios");
require("dotenv").config();



module.exports.simulation = async function simulation(cpf){
    cpf = cpf.replace(/\D/g,'');
    var cpfFomatted = cpf.substring(0, 3) + "." + cpf.substring(3,6)+"."+cpf.substring(6,9)+"-"+cpf.substring(9);
    var data = JSON.stringify({
        "cpf": cpfFomatted,
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
            console.log((response.data))
            return(response.data)
        })
        .catch( function(error){
            
            console.log(error);
            return false
        });
    
    
    return simulationInfo
}