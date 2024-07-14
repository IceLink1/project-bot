const TelegramApi=require('node-telegram-bot-api')
const TelegramBot = require("node-telegram-bot-api");
const {gameOptions,againOptions} = require('./options')
const token='7400652744:AAELFNu7afeSlPDKjrfvd2Bl7Q4m8Ijw6dI'

const chats={}



const startGame= async (chatId)=>{
    await  bot.sendMessage(chatId, `guess number .from 0 to 9` )
    const randomNumber=Math.floor(Math.random()*10)
    chats[chatId]=randomNumber
    await bot.sendMessage(chatId,'guess numb',gameOptions)
}

const bot = new TelegramBot(token,{polling:true})

const start=()=>{
    bot.setMyCommands([
        {command:'/start',description:'Start',},
        {command:'/info',description:'Fokus',},
        {command:'/game',description:'Numbers',},
    ])

    bot.on('message',  async msg => {
        const text = msg.text
        const chatId = msg.chat.id
        if(text ==='/start'){
            await bot.sendSticker(chatId,'https://tlgrm.eu/_/stickers/4dd/300/4dd300fd-0a89-3f3d-ac53-8ec93976495e/3.webp')
            return  bot.sendMessage(chatId,"Welcom to ICELINK_BOT . This bot created Salohiddin @I_ICELINK_I . ")
        }
        if(text === '/info'){
            return  bot.sendMessage(chatId, `Let me guess your name : ${msg.from.first_name}` )
        }
        if(text === '/game'){
            return startGame(chatId)
        }
        return bot.sendMessage(chatId,'I dont understand you :(')
    })

    bot.on('callback_query',  msg => {
        const data = msg.data;
        const chatId = msg.message.chat.id;
        if(data==='/again'){
            return startGame(chatId)
        }
        if(data===chats[chatId]){
            return bot.sendMessage(chatId,`You Win !!! ${chats[chatId]}` ,againOptions)
        }else {
            return bot.sendMessage(chatId,`You Lose :( numb is ${chats[chatId]}`,againOptions)
        }
        bot.sendMessage(chatId,`your numb is : ${data}`)
    })
}
start()