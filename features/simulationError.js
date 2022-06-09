

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
            "type":"buttons",
            "section":"Subscription",
            "body":"Se quiser tentar novamente, é só clicar no botão abaixo",
            "footer": "Clique na opção desejada",
            // "header":"",
      
            "buttons":[
                {
                    "text": "Tentar novamente",
                    "payload": "tentar_novamente"
                },
                {
                    "text": "Preciso de ajuda",
                    "payload": "ajuda"
                }
            ]

        },
        async(response,flow,bot) => {
          if(response == "tentar_novamente"){
            await bot.cancelAllDialogs();
            await bot.beginDialog("app-subscription");
          }   
          else{
              
            await bot.cancelAllDialogs();
            await bot.beginDialog("agent-transfer");
          }       
        }, 
    "cpf",
    "fgtsSimulation")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);
};



