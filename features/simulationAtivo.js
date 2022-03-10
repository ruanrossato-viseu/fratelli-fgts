const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulationAtivo", controller);
    const nlu = require('../scripts/nlu.js');

    flow.addAction("fgtsSimulation")
   

    

    
    flow.addQuestion("[fgtsSimulation]+++Ok, só um minutinho enquanto eu valido seus dados.",
        async(response,flow,bot) => {
            await bot.say("[SIMULATION]+++"+user.cpf)
            await flow.gotoThread("repeat")
        }, 
    "cpf",
    "fgtsSimulation")

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
    });

    controller.addDialog(flow);
};


