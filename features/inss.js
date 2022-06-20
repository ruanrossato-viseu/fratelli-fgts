
module.exports = function (controller) {

  const { BotkitConversation } = require("botkit");
  const flow = new BotkitConversation("inss", controller);

  flow.addAction("ativoInss")

  flow.addMessage(
      {
          "section": "Subscription",
          "body:": "Oi, <nome>, sou da Fratelli.",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      "intro")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Você terá R$<saldo> e pode receber ainda hoje.",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "Quero Contratar",
                  "payload": "contratar"
              },
              {
                  "text": "Agora não",
                  "payload": "nao"
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          if (response.includes("Quero Contratar") || response.includes("Sim") || response.includes("Yes")) {
              await flow.gotoThread("info")
          }
          else if (response.includes("Agora não") || response.includes("Não") || response.includes("Nao")) {
              await flow.gotoThread("correcao")
          }
          else
              await flow.gotoThread("finalizacao")
      },
      "saldo",
      "intro")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Poderia nos informar o motivo?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "Parcela Alta",
                  "payload": "Parcela Alta"
              },
              {
                  "text": "Quero um valor menor",
                  "payload": "Quero um valor menor"
              },
              {
                  "text": "Outro",
                  "payload": "Outro"
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          if (response.includes("Parcela Alta") || response.includes("Parcela")) {
              await flow.gotoThread("intro")
          }
          else if (response.includes("Quero um valor menor") || response.includes("Valor menor")) {
              await flow.gotoThread("intro")
          }
          else if (response.includes("Outro") || response.includes("Outros")) {
              await flow.gotoThread("finalizacao")
          }
          else
              await flow.gotoThread("finalizacao")
      },
      "motivo",
      "motivo")

  flow.addMessage(
      {
          "section": "Subscription",
          "body:": "Ok, para liberar seu crédito é necessário confirmar algumas informações.\
          \nVamos começar?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      "info")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Você é o <nome>?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          if (response.includes("Sim") || response.includes("Yes")) {
              await flow.gotoThread("cpf")
          }
          else if (response.includes("No") || response.includes("Não") || response.includes("Nao")) {
              await flow.gotoThread("cpf")
          }
          else
              await flow.gotoThread("finalizacao")
      },
      "nomeCliente",
      "info")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Digite o seu CPF abaixo:",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          var cpf = response
          var cpfRegex = new RegExp(/^\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{3}( ?[.-] ?| )?\d{2}$/)
          if (cpfRegex.test(cpf)) {
              await flow.gotoThread("link");
          }
          else {
              await flow.gotoThread("solicitaCpf")
          }
      },
      "cpf",
      "solicitaCpf")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Para concluir, basta clicar no link <url>",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          var horarioSaida = response
          await flow.gotoThread("link")
      },
      "link",
      "link")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Qual o banco?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          var horarioAlmoco = response
          await flow.gotoThread("agencia")
      },
      "banco",
      "banco")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Qual a agência?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          var titulo = response
          await flow.gotoThread("numeroConta")
      },
      "agencia",
      "agencia")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Qual o número da conta?\
          \nOBS: Com dígito",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          var descricao = response
          await flow.gotoThread("tipoConta")
      },
      "numeroConta",
      "numeroConta")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Qual é o tipo de conta?",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "corrente",
                  "payload": "Conta Corrente"
              },
              {
                  "text": "poupanca",
                  "payload": "Conta Poupança"
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
          if (response.includes("Conta Corrente") || response.includes("Corrente")) {
              await flow.gotoThread("link")
          }
          else if (response.includes("Conta Poupança") || response.includes("poupança") || response.includes("poupanca")) {
              await flow.gotoThread("link")
          }
          else
              await flow.gotoThread("tipoConta")
      },
      "tipoConta",
      "tipoConta")

  flow.addQuestion(
      {
          "section": "Subscription",
          "body:": "Ok, se precisar é só chamar!",
          "footer": "",
          "header": "",

          "buttons": [
              {
                  "text": "",
                  "payload": ""
              },
              {
                  "text": "",
                  "payload": ""
              }
          ],

          "media":
          {
              "contentType": "image|video|document",
              "mediaURL": "",
              "mediaID": "",
              "caption": "",
              "filename": ""
          }
      },
      async (response, flow, bot) => {
      },
      "finalizacao",
      "finalizacao")

  flow.after(async (response, bot) => {
      await bot.cancelAllDialogs();
  });
  controller.addDialog(flow);
};

