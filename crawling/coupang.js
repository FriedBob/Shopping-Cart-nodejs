const puppeteer = require('puppeteer');
const request = require('request');
const fs = require('fs');
const path = require('path');
const HTTPS = require('https');
const domain = "www.chatbotshin.tk"
const sslport = 23023;
const bodyParser = require('body-parser');

//--------------- Line messanger modules -------------------
const TARGET_URL = 'https://api.line.me/v2/bot/message/reply'
const TARGET_URL_2 = 'https://api.line.me/v2/bot/message/push'
var USER_ID = ' ';
const token = require('../config/key');
const TOKEN = token.token;  //사용자 토큰
//----------------------------------------------------------

// ------------ db calling modules ---------
var dbcontrol = require('../db/dbcontrol');
// -----------------------------------------


// coupang Cart Crawling
async function coupang_c(user_id, c_id, c_pw){
  USER_ID = user_id;

  // launching headless browser
  const browser = await puppeteer.launch();
  // making a new page
  const page = await browser.newPage();

    console.log('유저정보입력완료'); //정상입력 확인용


  // Gmarket login page
  await page.goto('https://login.coupang.com/login/login.pang?rtnUrl=https%3A%2F%2Fwww.coupang.com%2Fnp%2Fpost%2Flogin%3Fr%3Dhttps%253A%252F%252Fwww.coupang.com%252F');
  // Ading user information
  await page.evaluate((id, pwd) => {
    document.querySelector('#login-email-input').value = id;
    document.querySelector('#login-password-input').value = pwd;
  }, c_id, c_pw);

  await console.log('로그인중');
  
  // try login
  await page.click('.login__button');
  await page.waitForNavigation();

  // goto cart page
  await page.goto('https://cart.coupang.com/cartView.pang');

  // container which will hold crawled data [{},{}...]
  let data = [];

  // crawling start! (using getOne and getAll function)
    data = await getAll(page);

  //logging the result
  for(let index = 0; index < data.length; index++){

    // 뽑아낸 정보 reply
    await replying(data[index].prd_img, data[index].prd_name, data[index].prd_price, data[index].prd_link);
    // DB에 정보 삽입
    await dbcontrol.synchronization(USER_ID, data[index].prd_img, data[index].prd_name, data[index].prd_price, data[index].prd_link);
    console.log(data[index]);
  }

  await browser.close();
  
}



 // Crawling cart informations(object) to data(array)
 async function getAll(page) {
  var data = [];

  //coupang table tr counts has dummy 3 tr
  const number = await page.$$eval("#cartTable-sku > tr", (data) => data.length)-3;
  // counting the number of the box
  // coupang car info starts with index 2
  for (let index = 0; index < number; index++) {
    data.push(await getOne(page, index + 2));
      // pushing to the array

  }

  return Promise.resolve(data);
}


// Crawling cart information to data(object)
async function getOne(page, index) {

  var data = {};

  // this is example code
  //data.programPeriod = await page.$eval("#iph_content > div > div.list_type_h1.web_view.mt3 > table > tbody > tr:nth-child(" + index + ") > td:nth-child(5)", (data) => data.textContent);

  // product name
  data.prd_name = await page.$eval("#cartTable-sku > tr:nth-child(" + index + ") > td.product-box > div.product-name-part > a", data => data.textContent);
  // product price
  data.prd_price = await page.$eval("#cartTable-sku > tr:nth-child(" + index + ") > td.unit-total-price > div", data => data.textContent);
  // product link
  data.prd_link = await page.$eval("#cartTable-sku > tr:nth-child(" + index + ") > td.product-box > div.product-name-part > a", data => data.href);
  // product image source
  data.prd_img = await page.$eval("#cartTable-sku > tr:nth-child(" + index + ") > td:nth-child(2) > a > img", data => data.src);
  // not yet

  return Promise.resolve(data);
}

async function replying(img_link, msg1, msg2, msg3){  //push function
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

module.exports.coupang_c = coupang_c;
module.exports.getOne = getOne;
module.exports.getAll = getAll;