# <span style="font-size:3rem">๐ ShoppingCart</span>

ํ๊ตญ ์์ ์ผํ๋ชฐ ์ฌ์ดํธ 3๊ฐ์ง์ ์ฅ๋ฐ๊ตฌ๋๋ฅผ ํ๊ตฐ๋ฐ๋ก ๋ชฐ์๋ฃ์ด๋ณด์๋ผ๋ ์ทจ์ง๋ก ๊ฐ๋ฐํ Line ์ฑ๋ด์๋๋ค.

๋์ ๋ฐฉ์ ๋ฐ ์ค๋ช์ .pptx๋ฅผ ์ฐธ๊ณ ๋ถํ๋๋ฆฝ๋๋ค.

2022๋ 8์ ํ์ฌ ์ฐ๊ฒฐ๋ AWS ์๋ฒ์ ๋ง๋ฃ๋ก ๋ฐฑ์๋๊ฐ ์๋ํ์ง ์์ต๋๋ค.

&nbsp;&nbsp;

# ๐ What can you do with the Project

- g๋ง์ผ ๋ก๊ทธ์ธ ํ ์ฅ๋ฐ๊ตฌ๋์์ ๋ด์ญ ์ถ๋ ฅ
- ์ฟ ํก ๋ก๊ทธ์ธ ํ ์ฅ๋ฐ๊ตฌ๋์์ ๋ด์ญ ์ถ๋ ฅ
- ์ฅ์ ๋ก๊ทธ์ธ ํ ์ฅ๋ฐ๊ตฌ๋์์ ๋ด์ญ ์ถ๋ ฅ
- ์์ฒด DB์ ์ฅ๋ฐ๊ตฌ๋ ๋ด์ญ ์ ์ฅ ๋ฐ ์ถ๋ ฅ, ์ญ์ 

&nbsp;&nbsp;

# ๐ STACKS

<div>
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/lowDB-257546?style=for-the-badge&logoColor=white"/>
<img src="https://img.shields.io/badge/Puppeteer-40B5A4?style=for-the-badge&logo=Puppeteer&logoColor=white"/>
<img src="https://img.shields.io/badge/Line-00C300?style=for-the-badge&logo=Line&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazone_Ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white"/>
</div>

&nbsp;&nbsp;

# ๐จ Built With

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

# ๐ How to Use

<img src="imgage/LINE_APP.png" width="20%" height="20%" alt="line"></img>
<img src="imgage/Shoppingcart_QR.png" width="20%" height="20%" alt="line"></img>

&nbsp;&nbsp;

๋ผ์ธ ๊ธฐ๋ฐ ์ฑ๋ด์ด๋ฏ๋ก ๋ผ์ธ์์ ํด๋น ์ ์ ๋ฅผ QR code ์น๊ตฌ์ถ๊ฐ ํ๋ฉด ๋ฉ๋๋ค.

์ฌ์ฉ๋ฒ์ ์ฒจ๋ถ๋ pptx ํ์ผ์ ๋์์์ต๋๋ค

- ์ฒซ ํฌ๋กค๋ง์ ์๊ฐ์ด ์ค๋ ๊ฑธ๋ฆด ์ ์์ผ๋ ์ ์ํด ์ฃผ์ธ์.

&nbsp;&nbsp;

# ๐ How to INSTALL

ํด๋น ํ๋ก์ ํธ์ ๊ธฐ์ฌํ๊ณ  ์ถ์ ์ฌ๋์ ์ํ ์๋ด์๋๋ค.

&nbsp;&nbsp;

์ฐ์  ํ๋ก์ ํธ๋ฅผ `git clone` ํฉ๋๋ค

```
git clone ssh://git@khuhub.khu.ac.kr:12959/2015104185/ShoppingCart.git
```

&nbsp;&nbsp;

์ดํ ํ์ํ npm ๋ชจ๋์ ๊ฐ์ ๋๋ ํ ๋ฆฌ์ ์ค์นํด ์ค๋๋ค

```
npm install --save request
npm install --save express
npm install --save lowdb
npm install --save puppeteer
```

&nbsp;&nbsp;

๋ค์ด๋ฒ ์ฑ๋ด api๋ฅผ ์ฌ์ฉํ๊ธฐ ์ํด์๋ naver developer ์์ api๋ฅผ ๋ฐ๊ธ ๋ฐ์ ํ์๊ฐ ์์ต๋๋ค.
https://developers.line.biz/en/

---

API KEY๊ฐ์ ๋ฐ๊ธ ๋ฐ์ ํ `config/key.js` ์์ const token ๊ฐ์ ๋ฐ๊ธ๋ฐ์ ํค ๊ฐ์ผ๋ก ๋ณ๊ฒฝํด ์ค๋๋ค.

์ดํ `app.js`์ _domain_์ localhost๋ก _sslport_๋ฅผ ์ฌ์ฉ์๊ฐ ๊ฐ๋ฐฉํ ํฌํธ ๋ฒํธ๋ก ์ค์ ํด ์ค๋๋ค

์๋ฃํ๋ค๋ฉด ๋ณด์ ํ ๋ฆฌ๋์ค ๊ธฐ๋ฐ AWS ์๋ฒ์์ ์ด์ํ๊ฑฐ๋ ๋ฆฌ๋์ค ์ด์์ฒด์ ์์ localhost ๊ธฐ๋ฐ์ผ๋ก ์ฝ๋๋ฅผ ์ง์  ์ฌ์ฉํ  ์ ์์ต๋๋ค.

- Windows ์ด์์ฒด์ ์์๋ path ๊ด๋ จ ๋ฌธ๋ฒ์ด ๋ฌ๋ผ ์๋ํ์ง ์์ ์ ์์ต๋๋ค.
