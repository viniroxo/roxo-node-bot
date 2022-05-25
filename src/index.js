'use-strict'

require('dotenv-safe').config();
const {Telegraf} = require('telegraf')
const axios = require('axios').default;

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', ctx => {
    bot.telegram.sendMessage(ctx.chat.id, 'Olá, bem vindo ao RoxoBot')
});

bot.command('clima', ctx => {
    const city = ctx.update.message.text.split(/\/clima (.+)/);
    const WEATHER_API = 'https://api.hgbrasil.com/weather?key=' + process.env.WEATHER_API_TOKEN + '&city_name=' + city;

    axios.get(WEATHER_API).then(response => {
        const {data: weather } = response;

        let msg =  '-----' +weather.results.city+ '-----\n'
        msg += 'Temperatura: ' + weather.results.temp + '°C\n';
        msg += 'Descrição: ' + weather.results.description + '\n';
        msg += 'Humidade do ar: ' + weather.results.humidity + '%\n';
        msg += 'Nascer do sol: ' + weather.results.sunrise + '\n';
        msg += 'Pôr do sol: ' + weather.results.sunset + '\n';
        msg += 'Velocidade do ar: ' + weather.results.wind_speedy + '\n';

        bot.telegram.sendMessage(ctx.chat.id, msg)
    }).catch((err) => console.log('error', err))
})

bot.launch();
