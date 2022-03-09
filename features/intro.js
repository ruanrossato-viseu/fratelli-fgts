
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("inicio", controller);
    
    flow.addAction("intro")

    flow.addMessage("[INTRO]+++Pronto! Em poucos minutos eu te ajudarei a verificar o valor do seu FGTS retido, para isso temos que seguir alguns passos.",
                    "intro")

    flow.addMessage("[INTRO]+++Para garantir sua segurança e privacidade, seguimos as diretrizes da Lei Geral de Proteção de Dados. Para saber mais, acesse o link (LINK)", 
                    "intro")

    
    // flow.addMessage({
    //     text: "teste",
    //     channelData: {
    //         mediaUrl: 'https://i.imgur.com/9n3qoKx.png',
    //     },
    // },
    // "intro")
    
    

    flow.after(async (response, bot) => {
        await bot.cancelAllDialogs();
        await bot.beginDialog("app-install");
    });
    controller.addDialog(flow);
};