# <span style="font-size:3rem">🛒 ShoppingCart</span>

한국 상위 쇼핑몰 사이트 3가지의 장바구니를 한군데로 몰아넣어보자라는 취지로 개발한 Line 챗봇입니다.

동작 방식 및 설명은 .pptx를 참고부탁드립니다.

2022년 8월 현재 연결된 AWS 서버의 만료로 백엔드가 작동하지 않습니다.

&nbsp;&nbsp;

# 🎈 What can you do with the Project

- g마켓 로그인 후 장바구니에서 내역 출력
- 쿠팡 로그인 후 장바구니에서 내역 출력
- 옥션 로그인 후 장바구니에서 내역 출력
- 자체 DB에 장바구니 내역 저장 및 출력, 삭제

&nbsp;&nbsp;

# 📚 STACKS

<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/lowDB-257546?style=for-the-badge&logoColor=white"/>
<img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"/>
<img src="https://img.shields.io/badge/Line-00C300?style=for-the-badge&logo=Line&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazone_Ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"/>
</div>

&nbsp;&nbsp;

# 🔨 Built With

- [Nodejs v12.16.2]
- [npm v6.14.4]
- [Express]
- [Puppeteer]
- LowDB
- [Line Messenger API]

- Ubuntu 16.04 with AWS

[nodejs v12.16.2]: https://nodejs.org/ko/
[npm v6.14.4]: https://www.npmjs.com/
[express]: https://expressjs.com/ko/
[puppeteer]: https://pptr.dev/
[line messenger api]: https://developers.line.biz/en/

&nbsp;&nbsp;

# 🔑 How to Use

<img src="imgage/LINE_APP.png" width="20%" height="20%" alt="line"></img>
<img src="imgage/Shoppingcart_QR.png" width="20%" height="20%" alt="line"></img>

&nbsp;&nbsp;

라인 기반 챗봇이므로 라인에서 해당 유저를 QR code 친구추가 하면 됩니다.

사용법은 첨부된 pptx 파일에 나와있습니다

- 첫 크롤링은 시간이 오래 걸릴 수 있으니 유의해 주세요.

&nbsp;&nbsp;

# 🔈 How to INSTALL

해당 프로젝트에 기여하고 싶은 사람을 위한 안내입니다.

&nbsp;&nbsp;

우선 프로젝트를 `git clone` 합니다

```
git clone ssh://git@khuhub.khu.ac.kr:12959/2015104185/ShoppingCart.git
```

&nbsp;&nbsp;

이후 필요한 npm 모듈을 같은 디렉토리에 설치해 줍니다

```
npm install --save request
npm install --save express
npm install --save lowdb
npm install --save puppeteer
```

&nbsp;&nbsp;

네이버 챗봇 api를 사용하기 위해서는 naver developer 에서 api를 발급 받을 필요가 있습니다.
https://developers.line.biz/en/

---

API KEY값을 발급 받은 후 `config/key.js` 에서 const token 값을 발급받은 키 값으로 변경해 줍니다.

이후 `app.js`의 _domain_을 localhost로 _sslport_를 사용자가 개방한 포트 번호로 설정해 줍니다

완료했다면 보유한 리눅스 기반 AWS 서버에서 운영하거나 리눅스 운영체제에서 localhost 기반으로 코드를 직접 사용할 수 있습니다.

- Windows 운영체제에서는 path 관련 문법이 달라 작동하지 않을 수 있습니다.
