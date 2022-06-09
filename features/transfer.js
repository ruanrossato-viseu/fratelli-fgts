
module.exports = function(controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("agent-transfer", controller);

    flow.addAction("transbordo")
    flow.addMessage(
        {
            "type":"message",
            "section":"Subscription",
            "body":"Para falar com um de nossos atendentes, é só clicar no link e falar nesse whatsapp: https://wa.me/5511946204724",
            // "footer":"",
            // "header":"",
      
            // "buttons":[
            //     {
            //         "text": "",
            //         "payload": ""
            //     },
            //     {
            //         "text": "",
            //         "payload": ""
            //     }
            // ],
            
            // "media":
            //     {
            //         "contentType": "image|video|document",
            //         "mediaURL":"",
            //         "mediaID":"",
            //         "caption":"",
            //         "filename":""
            //     }
            },
                    "transbordo")
                    
    flow.after(async (results, bot) => {
        await bot.cancelAllDialogs();
    });
    controller.addDialog(flow);
};