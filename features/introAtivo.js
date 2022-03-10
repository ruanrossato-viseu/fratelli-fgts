module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("introAtivo", controller);
    const nlu = require('../scripts/nlu.js');
    
    flow.addAction("ativo");

    flow.addMessage("[INTRO]+++Para garantir sua segurança e privacidade, seguimos as diretrizes da Lei Geral de Proteção de Dados. Para saber mais, acesse o link (LINK)",
                "ativo");

    
    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("simulationAtivo");
    });
    controller.addDialog(flow);
};