

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulationError", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   

    function isNumeric(num){
        return !isNaN(num)
    }
    flow.addQuestion(
        {
            "type": "message",
            "section": "fgtsSimulation",
            "body": "Teste"
        },
        async (response, flow, bot) => {
            var cpf = response
            var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if (cpfRegex.test(cpf)) {
                // await bot.say("[SIMULATION]+++"+cpf)
                // await flow.gotoThread("preSimulation");
            }
            else {
                console.log("ok")
                // await flow.gotoThread("getCpfAgain")
            }
        },
        "cpf",
        "fgtsSimulation")
    // flow.addQuestion(
    //     {
    //         "type":"buttons",
    //         "section":"Subscription",
    //         "body":"Se quiser tentar novamente, é só clicar no botão abaixo",
    //         "footer": "Clique na opção desejada",
    //         // "header":"",
      
    //         "buttons":[
    //             {
    //                 "text": "Tentar novamente",
    //                 "payload": "tentar_novamente"
    //             }
    //         ],

    //     },
    //     async(response,flow,bot) => {
    //       if(response == "tentar_novamente"){
    //           console.log("tentar novamente")
    //         // await bot.cancelAllDialogs();
    //         // await bot.beginDialog("app-subscription");
    //       }   
    //       else{
    //         console.log("transferencia")
    //         // await bot.cancelAllDialogs();
    //         // await bot.beginDialog("agent-transfer");
    //       }       
    //     }, 
    // "cpf",
    // "fgtsSimulation")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);
};



