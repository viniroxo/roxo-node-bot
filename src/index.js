'use-strict'

const { Telegraf } = require('telegraf')

const bot = new Telegraf('BOT_TOKEN');

bot.command('start', ctx => {
    console.log(ctx.from)
    bot.telegram.sendMessage(ctx.chat.id, 'Olá, bem vindo ao RoxoBot', {
    })
});

bot.launch();