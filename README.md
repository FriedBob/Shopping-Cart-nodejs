ShoppingCart
============
한국 상위 쇼핑몰 사이트 3가지의 장바구니를 한군데로 몰아넣어보자라는 취지로 개발한 Line 챗봇입니다.

동작 방식 및 설명은 .pptx를 참고부탁드립니다.

2022년 8월 현재 연결된 AWS 서버의 만료로 백엔드가 작동하지 않습니다.

What can you do with the Project
==================================
* g마켓 로그인 후 장바구니에서 내역 출력
* 쿠팡 로그인 후 장바구니에서 내역 출력
* 옥션 로그인 후 장바구니에서 내역 출력
* 자체 DB에 장바구니 내역 저장 및 출력, 삭제
    
Built With
==========
* [Nodejs v12.16.2][nodelink]
[nodelink]: https://nodejs.org/ko/
* [npm v6.14.4][npmlink]
[npmlink]: https://www.npmjs.com/
* [Express][exlink]
[exlink]: https://expressjs.com/ko/
* [Puppeteer][plink]
[plink]: https://pptr.dev/
* LowDB
* [Line Messenger API][naver]
[naver]: https://developers.line.biz/en/
* Ubuntu 16.04 with AWS

How to Use
=================
<img src="imgage/LINE_APP.png" width="20%" height="20%"alt="line"></img>
<img src="imgage/Shoppingcart_QR.png" width="20%" height="20%"alt="line"></img>
___
라인 기반 챗봇이므로 라인에서 해당 유저를 QR code 친구추가 하면 됩니다.

사용법은 첨부된 pptx 파일에 나와있습니다

* 첫 크롤링은 시간이 오래 걸릴 수 있으니 유의해 주세요.

How to INSTALL
==================
해당 프로젝트에 기여하고 싶은 사람을 위한 안내입니다.
___
우선 프로젝트를 git clone 합니다
```
git clone ssh://git@khuhub.khu.ac.kr:12959/2015104185/ShoppingCart.git
```
이후 필요한 npm 모듈을 같은 디렉토리에 설치해 줍니다
```
npm install --save request
npm install --save express
npm install --save lowdb
npm install --save puppeteer
```
네이버 챗봇 api를 사용하기 위해서는 naver developer 에서 api를 발급 받을 필요가 있습니다.
https://developers.line.biz/en/
___
API KEY값을 발급 받은 후 config/key.js 에서 const token 값을 발급받은 키 값으로 변경해 줍니다.

이후 app.js의 domain을 localhost로 sslport를 사용자가 개방한 포트 번호로 설정해 줍니다

완료했다면 보유한 리눅스 기반 AWS 서버에서 운영하거나 리눅스 운영체제에서 localhost 기반으로 코드를 직접 사용할 수 있습니다.
* Windows 운영체제에서는 path 관련 문법이 달라 작동하지 않을 수 있습니다.
