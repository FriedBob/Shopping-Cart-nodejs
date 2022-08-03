//----------------low db-----------------------------------
const request = require('request');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
const fs = require('fs');

const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TARGET_URL_2 = 'https://api.line.me/v2/bot/message/push'
const token = require('../config/key');
const TOKEN = token.token;  // 사용자 토큰 
//var USER_ID = ' ';  // LINE 메세지 유저 아이디

//---------------------------------------------------------

// db 초기화
function start_db(USER_ID){

const adapter = new FileSync(USER_ID + '.json');
const db = low(adapter);
db.defaults({cart : []}).write();

}

// 장바구니 동기화
async function synchronization(USER_ID, prd_img, prd_name, prd_price, prd_link){

    const adapter = new FileSync(USER_ID + '.json');
    const db = low(adapter);
    db.defaults({cart : []}).write();

    // 중복 있는지 검사하는 코드를 if구문에 넣기 (prd_link 기반으로)
    // 입력받은 정보를 db에 저장
    db.get('cart')
    .push({    
        PRD_IMG : prd_img,
        PRD_NAME : prd_name,
        PRD_PRICE : prd_price,
        PRD_LINK : prd_link
    }).write();

}

// db에서 목록 검색 후 삭제
async function deleting(USER_ID, prd_link){
    
    try {
        fs.statSync('./' + USER_ID + '.json');  // 이미 파일이 있다면
        console.log('file or directory exists');

        const adapter = new FileSync(USER_ID + '.json');
        const db = low(adapter);
        db.defaults({cart : []}).write();
    
        db.get('cart')
        .remove({PRD_LINK : prd_link})
        .write();  // prd_link 참조 삭제

        pushing(USER_ID, '-----삭제 완료-----');
    }
    catch (err) {   // 파일이 없다면
      if (err.code === 'ENOENT') {
            console.log('file or directory does not exist');
            pushing(USER_ID, 'DB가 존재하지 않습니다');
      }
      else{
        console.log('삭제할 내용과 일치하는 리스트가 없습니다.');
        pushing(USER_ID, '삭제할 내용과 일치하는 리스트가 없습니다');
      }
    }

}

// db에서 USER_ID 기반 장바구니 조회
async function viewing(USER_ID){

    try {
        fs.statSync('./' + USER_ID + '.json');  // 이미 파일이 있다면
        console.log('file or directory exists');

        const adapter = new FileSync(USER_ID + '.json');
        const db = low(adapter);
        db.defaults({cart : []}).write();

        var datalist = new Array();

        datalist = db.get('cart').value();        // [ { } ] 배열속 객체형태로 리턴

        //메세지로 내역 push하는 기능

        console.log(datalist);

        datalist.forEach(function(item, index, array){
             viewall(USER_ID, array[index].PRD_IMG, array[index].PRD_NAME, array[index].PRD_PRICE, array[index].PRD_LINK);
        });
    }
    catch (err) {   // 파일이 없다면
        if (err.code === 'ENOENT') {
          console.log('file or directory does not exist');
          pushing(USER_ID, 'DB가 존재하지 않습니다');
        }
        else{
            console.log('Directory is empty');
            pushing(USER_ID, 'DB 가 비었습니다.');
          }
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
async function pushing(USER_ID, sp_message){  //push function
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

  //================== 장바구니 목록 전체 출력 ===================================
  async function viewall(USER_ID, img_link, msg1, msg2, msg3){  //push function
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
                        "type":"image",
                        "originalContentUrl": img_link,
                        "previewImageUrl": img_link
                    },
                    {
                        "type": "text",
                        "text": "상품명: " + msg1   // replying message
                    },
                    {
                        "type": "text",
                        "text": "가격: " + msg2 + " 원"  // replying message
                    },
                    {
                        "type": "text",
                        "text": "링크: " + msg3   // replying message
                    }
  
                ]
            }
        },(error, response, body) => {
            //console.log(body)
        });
  }

module.exports.start_db = start_db;
module.exports.synchronization = synchronization;
module.exports.deleting = deleting;
module.exports.viewing = viewing;