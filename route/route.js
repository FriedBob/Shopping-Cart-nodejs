// 쇼핑사이트 분기점 제공용

const request = require('request');
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');

//--------------- Line messanger modules -------------------
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TARGET_URL_2 = 'https://api.line.me/v2/bot/message/push'
var USER_ID = ' ';  // pushing 용 유저아이디
const token = require('../config/key');
const TOKEN = token.token;  //사용자 토큰
//----------------------------------------------------------


// ---------- Shopping modules -------------
var gmarket = require('../crawling/gmarket');
var coupang = require('../crawling/coupang');
var auction = require('../crawling/auction');
var shopping = 0;           // in shopping menu identifier    0 = idle, 1 = shop selecting, 2 = select complete, 3 = shop method selecting
var shop_select = undefined     // shopping-site identifier
var method_action = 0;      // typing count;
var user_info = new Array();    // 유저 정보 저장용
var deleting_able = false;      // 장바구니 항목 삭제용
//------------------------------------------

// ------------ db calling modules ---------
var dbcontrol = require('../db/dbcontrol');
// -----------------------------------------

// ========================================= 쇼핑몰 연결 중계 =========================================
async function shoppingroute(user_message, user_id, replyToken){

    USER_ID = user_id;

    if(user_message == '/쇼핑' ){
        replying(replyToken, '쇼핑을 선택하셨습니다.\n원하시는 쇼핑몰 사이트 또는 기능을 선택하세요.\n현재 제공되는 사이트는 \n\n/g마켓\n/옥션\n/쿠팡\n\n입니다.\n\n기능은\n/장바구니조회\n/장바구니삭제\n\n입니다.\n\n/취소 로 해당 메뉴에서 퇴장이 가능합니다.');
        shopping = 1;   // 다음 메세지에 선택하지 못할 경우 0으로 되돌릴 필요가있음
    }

    // 삭제 단독 처리용
    if(deleting_able === true && shopping == 1){
        dbcontrol.deleting(USER_ID, user_message);  // user_message는 링크로 입력할 것
        shopping = 0; deleting_able = false;        // 메인메뉴로 되돌아감
    }

    if(shopping == 1){
        if(user_message == '/g마켓'){
            replying(replyToken, 'g마켓을 선택하셨습니다.\n원하시는 항목을 선택하세요.\n\n/장바구니동기화');
            shopping = 2; shop_select = 'g마켓';
        }else if(user_message == '/옥션'){
            replying(replyToken, '옥션을 선택하셨습니다.\n원하시는 항목을 선택하세요.\n\n/장바구니동기화');
            shopping = 2; shop_select = '옥션';
        }else if(user_message == '/쿠팡'){
            replying(replyToken, '쿠팡을 선택하셨습니다.\n원하시는 항목을 선택하세요.\n\n/장바구니동기화');
            shopping = 2; shop_select = '쿠팡';
        }else if(user_message == '/장바구니조회'){
            // DB에서 USER_ID.json 을 가진 파일을 읽어들임
            replying(replyToken, '장바구니조회를 선택하셨습니다.\nDB를 읽고 있습니다.');
            dbcontrol.viewing(USER_ID);
            shopping = 0;   // 메인메뉴로 되돌아감
        }else if(user_message == '/장바구니삭제'){
            replying(replyToken, '장바구니삭제를 선택하셨습니다.\n삭제할 링크를 입력해주세요.');
            deleting_able = true;   // 삭제가능상태 적용
            dbcontrol.deleting(user_message);
            shopping = 0;   // 메인메뉴로 되돌아감
        }
    }

    // 쇼핑 -> g마켓
    if(shopping == 2 || shopping == 3){
        if(shop_select=='g마켓'){
                if(shopping == 2 && user_message == '/장바구니동기화')
                {
                    replying(replyToken, '====장바구니동기화====\n\n장바구니를 동기화 하기 위해 쇼핑몰에 연결합니다.\n\n아이디와 패스워드를 입력해 주세요:');
                    method_action = 2;
                    shopping = 3;
                }
                else if(shopping == 3 && method_action != 0)
                {
                    replying(replyToken, '===아이디/패스워드 입력중===');
                    user_info[method_action] = user_message;    // 아이디 패스워드를 user_info[2], user_info[1]에 저장
                    method_action--;
                    if(method_action==0){
                        //장바구니 크롤링하는 함수
                        USER_ID = user_id;   // 상대방 ID 획득
                        await gmarket.gmarket_c(USER_ID, user_info[2], user_info[1]);
                        shopping = 0;
                        shop_select = undefined;    //메인메뉴로 돌아가기 위함
                    }
                }
         }
    }

    // 쇼핑 -> 옥션
    if(shopping == 2 || shopping == 3){
        if(shop_select=='옥션'){
                if(shopping == 2 && user_message == '/장바구니동기화')
                {
                    replying(replyToken, '====장바구니동기화====\n\n장바구니를 동기화 하기 위해 쇼핑몰에 연결합니다.\n\n아이디와 패스워드를 입력해 주세요:');
                    method_action = 2;
                    shopping = 3;
                }
                else if(shopping == 3 && method_action != 0)
                {
                    replying(replyToken, '===아이디/패스워드 입력중===');
                    user_info[method_action] = user_message;    // 아이디 패스워드를 user_info[2], user_info[1]에 저장
                    method_action--;
                    if(method_action==0){
                        //장바구니 크롤링하는 함수
                        USER_ID = user_id;   // 상대방 ID 획득
                        await auction.auction_c(USER_ID, user_info[2], user_info[1]);
                        shopping = 0;
                        shop_select = undefined;    //메인메뉴로 돌아가기 위함
                    }
                }
         }
    }

    // 쇼핑 -> 쿠팡
    if(shopping == 2 || shopping == 3){
        if(shop_select=='쿠팡'){
                if(shopping == 2 && user_message == '/장바구니동기화')
                {
                    replying(replyToken, '====장바구니동기화====\n\n장바구니를 동기화 하기 위해 쇼핑몰에 연결합니다.\n\n아이디와 패스워드를 입력해 주세요:');
                    method_action = 2;
                    shopping = 3;
                }
                else if(shopping == 3 && method_action != 0)
                {
                    replying(replyToken, '===아이디/패스워드 입력중===');
                    user_info[method_action] = user_message;    // 아이디 패스워드를 user_info[2], user_info[1]에 저장
                    method_action--;
                    if(method_action==0){
                        //장바구니 크롤링하는 함수
                        USER_ID = user_id;   // 상대방 ID 획득
                        await coupang.coupang_c(USER_ID, user_info[2], user_info[1]);
                        shopping = 0;
                        shop_select = undefined;    //메인메뉴로 돌아가기 위함
                    }
                }
         }
    }
}

// ============================ /취소 입력시 =================================
async function cancel(user_message,replyToken){

    if(user_message.includes('/취소')){
        replying(replyToken, '진행중인 기능 및 메뉴를 종료합니다.');
        shopping = 0;
        shop_select = undefined
        method_action = 0;
        user_info.length = 0;
    }
}

//================== Just replying specific messages needed ===================================
async function replying(replyToken, sp_message){  // sp_message is message(string) that depends on the situation that user selects
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
           // console.log(body)
        });
}

//================== Just pushing specific messages needed ===================================
async function pushing(sp_message){  //push function
    request.post(
        {
            url: TARGET_URL_2,
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            },
            json: {
                "to": `${USER_ID}`,
                "messages":[
                    {
                        "type": "text",
                        "text": sp_message   // replying message
                    }
                ]
            }
        },(error, response, body) => {
            //console.log(body)
        });
  }

module.exports.shoppingroute = shoppingroute;
module.exports.cancel = cancel;
