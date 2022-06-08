const { MongoDbStorage } = require("botbuilder-storage-mongodb");

module.exports = function (controller) {

    const { BotkitConversation } = require("botkit");
    const flow = new BotkitConversation("simulation", controller);
    const nlu = require('../scripts/nlu.js');
    const banks = require('../scripts/banks.js');
    flow.addAction("getCpf")

    flow.before("getCpf", async (flow, bot) => {
        if (flow.vars.cpf > 0) {
            await flow.gotoThread("preSimulation");

        }
    })
    function isNumeric(num) {
        return !isNaN(num)
    }

    // flow.before("fgtsSimulation",async(flow,bot)=>{console.log(flow.vars.user)})

    // Solicita CPF
    flow.addQuestion(
        {
            "type": "message",
            "section": "fgtsSimulation",
            "body": "Para fazer sua simulação, só preciso que escreva o seu *CPF*, por favor"
        },
        async (response, flow, bot) => {
            var cpf = response
            var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if (cpfRegex.test(cpf)) {
                // await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("preSimulation");
            }
            else {
                await flow.gotoThread("getCpfAgain")
            }
        },
        "cpf",
        "getCpf")

    flow.addQuestion(
        {
            "type": "message",
            "section": "fgtsSimulation",
            "body": "Não consegui compreender. Tente novamente digitar o seu *CPF*, por favor.\
            \nEx: 123.45.789-01"
        },
        async (response, flow, bot) => {
            var cpf = response
            var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
            if (cpfRegex.test(response)) {
                // await bot.say("[SIMULATION]+++"+cpf)
                await flow.gotoThread("preSimulation");
            }
            else {
                await bot.beginDialog("agent-transfer")
            }
        },
        "cpf",
        "getCpfAgain")

    flow.addMessage(
        {
            "type": "info",
            "section": "cpf",
            "body": "{{vars.cpf}}"
        },
        "preSimulation");

    // flow.addMessage(
    //     {
    //         "type":"message",
    //         "section":"fgtsSimulation",
    //         "body":"Ok, só um minutinho enquanto eu pesquiso as melhores ofertas. Assim que eu acabar, chamo você."            
    //     },
    //     "preSimulation")

    // flow.addMessage({"type":"delay"},"fgtsSimulationConclusion")

    flow.addAction("simulationChoice", "preSimulation");

    flow.before("simulationChoice", async (flow, bot) => {

        var simulationResult = await banks.simulation(flow.vars.cpf)

        console.log(simulationResult)
        
        if (!simulationResult) {
            await bot.say({
                "type": "message",
                "text": {
                    "type": "message",
                    "section": "fgtsSimulation",
                    "body": "Não foi possível fazer a simulação agora."
                }
            })
            await flow.setVar("error", true)
            await flow.gotoThread("error")
        }
        else {
            if (simulationResult.simulation[0].success) {
                await bot.say({ "type": "message", "text": { "type": "info", "section": "simulation", "body": simulationResult } })
                var netValue = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(String(simulationResult.simulation[0].netValue))
                flow.setVar("netValue", netValue);
                flow.setVar("interest", simulationResult.simulation[0].interest);
                flow.setVar("installmentsCount", simulationResult.simulation[0].installments.length);
            }
            else {
                await bot.say({
                    "type": "message",
                    "text": {
                        "type": "message",
                        "section": "fgtsSimulation",
                        "body": "Não foi possível fazer a simulação agora"
                    }
                })
                await flow.setVar("error", true)
                await flow.gotoThread("error")
            }
        }
    });


    flow.addQuestion({
        "type": "buttons",
        "section": "fgtsSimulation",
        "body": "Consegui as seguintes condições para você:\
                        \nVocê receberá: {{vars.netValue}}\
                        \nParcelas adiantadas: {{vars.installmentsCount}}\
                        \nTaxa de juros: {{vars.interest}}%",
        "footer": "O que achou dessa proposta?",
        // "header":"",

        "buttons": [
            {
                "text": "Quero contratar!",
                "payload": "sim"
            },
            {
                "text": "Agora não",
                "payload": "nao"
            }
        ]
    },

        async (response, flow, bot) => {
            if (response == "sim") {
                await bot.cancelAllDialogs();
                await bot.beginDialog("signUp");
            }
            else {
                await bot.say({
                    "type": "message",
                    "text": {
                        "type": "message",
                        "section": "fgtsSimulation",
                        "body": "Ok, se quiser simular novamente, é só chamar"
                    }
                }
                );
            }

        },
        "simulationChoice",
        "simulationChoice")

    flow.addMessage(
        {
            "type": "info",
            "section": "error",
            "body": "error"
        },
        "error");

    flow.after(async (vars, bot) => {
        await bot.cancelAllDialogs();
        console.log(flow)
        if (vars.error ) {

            await bot.beginDialog("simulationError");
        }

    }
    )
    controller.addDialog(flow);
};



