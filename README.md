# Node.js를 활용한 Book 서점 웹사이트 개발
Node.js 웹 DB 개발에 대한 학습

### 주요 서비스

1. 책 리스트 나열
2. 장바구니 기능 
3. 책 구매 기능
4. 게시글 작성 기능
5. 책 리스트 생성 기능
6. 사용자 관리 기능

------------------------
Node.js : Express란?
Express는 웹 및 모바일 애플리케이션을 위한 일련의 강력한 기능을 제공하는 간결하고 유연한 Node.js 웹 애플리케이션 프레임워크이다. 사실상 Nodejs의 표준 웹서버 프레임워크로 불려질 만큼 많은 곳에서 사용하고 있다. 그렇다면 Node.js와 Express는 무슨 관계인가? 
- Node.js는 Chrome의 V8엔진을 이용하여 javascript로 브라우저가 아니라 서버를 구축하고, 서버에서 JavaScript가 작동되도록 해주는 런타임 환경(플랫폼)이다. Express는 이런 Nodejs의 원칙과 방법을 이용하여 웹애플리케이션을 만들기 위한 프레임워크이다.

왜 Express 를 사용해야 하지?
- Express는 프레임워크이므로 웹 애플리케이션을 만들기 위한 각종 라이브러리와 미들웨어 등이 내장돼 있어 개발하기 편하고, 수많은 개발자들에게 개발 규칙을 강제하여 코드 및 구조의 통일성을 향상시킬 수 있다. 그것이 바로 프레임워크 도입의 가장 큰 장점이다.
가장 많은 곳에서 보편적으로 사용되기 때문에 Express를 도입하면 구글링을 통해 충분한 레퍼런스들을 검색할 수 있다.
다만, Express 외에도 수 많은 Nodejs 웹서버 프레임워크가 존재한다, Express 개발팀에서 만든 Koa가 차세대 프레임워크가 될 것 같다고 한다.(Koa 공식 웹사이트에서도 차세대 웹프레임워크라고 소개하고 있음.) 현재는 많은 교재와 강의 등에서 Express로 설명을 하고 있으므로, Express를 먼저 공부하고 반드시 Koa를 사용해보는 것이 좋을 것 같다.
---------------------
<img width="1440" alt="스크린샷 2023-11-20 오후 5 05 07" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/f468f7e4-cbbe-4dd4-b623-01e101a50692">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 12 52" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/25476d75-d99a-4e0b-bc4d-2b7320272e50">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 12 55" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/998a5e3d-20b0-420a-936b-62a99d967867">

<img width="1353" alt="스크린샷 2023-11-20 오후 5 13 21" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/a3c08019-8e13-4ea2-8d23-905077203e2b">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 14 00" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/880f3f95-a24c-4777-a21c-ae84b6e8c684">

<img width="815" alt="스크린샷 2023-11-20 오후 5 14 08" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/f94ec9b3-b0d2-4f7f-b29c-9571c8198787">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 14 15" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/3ebbe0de-0c69-42d5-8c81-32e7a7e1d4c6">

<img width="1289" alt="스크린샷 2023-11-20 오후 5 14 39" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/ac22986a-9ecc-438b-8a54-2bdba8644848">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 14 47" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/5c8d7671-5cd8-4d00-b27f-67af23672a07">

<img width="847" alt="스크린샷 2023-11-20 오후 5 15 15" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/dd2a3869-de0d-4a46-8497-b5fdb5345853">

<img width="1440" alt="스크린샷 2023-11-20 오후 5 15 29" src="https://github.com/JiksGit/Node.js-Bookweb-/assets/96871403/0c8504f3-349a-4181-a8b7-2978db6ce84f">


