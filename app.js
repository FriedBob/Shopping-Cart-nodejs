var express = require('express');
const request = require('request');

//--------------- Line messanger modules -------------------
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TARGET_URL_2 = 'https://api.line.me/v2/bot/message/push'
var USER_ID = ' ';
const token = require('./config/key');

const TOKEN = token.token;  // 사용자 토큰 값
//----------------------------------------------------------

//--------------- Translating moudules ----------------------
const PAPAGO_URL = 'https://openapi.naver.com/v1/papago/n2mt'
const PAPAGO_ID = 'r_kuebFKCqBeL3SI_dFb'
const PAPAGO_SECRET = 'Wdz2tudrzB'
var trans = require('./trans/trans')
var trans_counter = 0;
//-----------------------------------------------------------

// ---------- Shopping modules -------------
var puppeteer = require('puppeteer');
var gmarket = require('./crawling/gmarket');
var coupang = require('./crawling/coupang');
var auction = require('./crawling/auction');
var route = require('./route/route');
var shopping = 0;           // in shopping menu identifier    0 = idle, 1 = shop selecting, 2 = select complete, 3 = shop method selecting
var shop_select = undefined     // shopping-site identifier
var method_action = 0;      // typing count;
var user_info = new Array();    // 유저 정보 저장용
//------------------------------------------


const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "www.chatbotshin.tk"
const sslport = 23023;
const bodyParser = require('body-parser');



var app = express();

//=============== middlewares ================
app.use(bodyParser.json());


//============== Utility Selector =========================================
app.post('/hook', async function (req, res) {

    //-------- request values ---------
    var eventObj = req.body.events[0];
    var source = eventObj.source;
    var message = eventObj.message;
    //---------------------------------

    //---------------- request log------------------------------------------------ // 개인정보 보호를 위해 완성후에는 삭제될 예정
    console.log('======================', new Date() ,'======================');
    console.log('[request]', req.body);
    console.log('[request source] ', eventObj.source);
    console.log('[request message]', eventObj.message);
    //----------------------------------------------------------------------------

    // 취소판정
    route.cancel(message.text, eventObj.replyToken);
    // 쇼핑몰 선택
    route.shoppingroute(message.text, eventObj.source.userId, eventObj.replyToken);
   
    //----------------------- Translation which includes language-selector -----------------------------------------------
    if(eventObj.message.text.includes('/번역')){
        console.log('번역캐치: ', eventObj.message.text);
        trans_counter = trans.trans_lng_selector(eventObj.message.text);     // after this trans_trigger = 1
    }
    else if(trans_counter==1){
        trans_counter = trans.translating(eventObj.replyToken, eventObj.message.text);  // after this trans_trigger = 0
    }
    //--------------------------------------------------------------------------------------------------------------------

    
    

    res.sendStatus(200);
});


//================== Just replying specific messages needed ===================================
function replying(replyToken, sp_message){  // sp_message is message(string) that depends on the situation that user selects
    request.post(
        {
            url: TARGET_URL,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "replyToken":replyToken,
                "messages":[
                    {
                        "type":"text",
                        "text":sp_message   // replying message
                    }
                ]
            }
        },(error, response, body) => {
            console.log(body)
            trans_trigger=0;
            return trans_trigger;
        });
}

//==================== Creating Server : Port = val sslport ===============================
try {
    const option = {
      ca: fs.readFileSync('/etc/letsencrypt/live/' + domain +'/fullchain.pem'),
      key: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/privkey.pem'), 'utf8').toString(),
      cert: fs.readFileSync(path.resolve(process.cwd(), '/etc/letsencrypt/live/' + domain +'/cert.pem'), 'utf8').toString(),
    };
  
    HTTPS.createServer(option, app).listen(sslport, () => {
      console.log(`[HTTPS] Server is started on port ${sslport}`);
    });
  } catch (error) {
    console.log('[HTTPS] HTTPS 오류가 발생하였습니다. HTTPS 서버는 실행되지 않습니다.');
    console.log(error);
  }
  