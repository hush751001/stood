# socket.io를 이용한 섰다
## 목적
* node.js로 서버 코드 작성
* socket.io를 이용한 websocket 처리
* babel을 사용하여 es2015 코드 적용
* sass에서 for를 이용한 카드 sprite 처리
* gulp 적용
* webpack을 적용하여 javascript가 모듈화 되도록 수정
* typescript로 변경하여 javascript와 typescript의 차이 비교

## 시나리오
게임참여 방이 하나있고 모든 접속자가 함께 시작을 한다. 카드가 20장이므로 10명이 접속하면 더이상 접속이 허용되지 않는다.

* [게임 참여] 버튼을 누르면 게임에 참여하게된다.
* 게임 참여자에게 카드 2장씩 나눠준다.
* 이때 각 화면에는 카드가 2장 보이게 한다. 
* [결정] 버튼을 누른다.
* 서버는 모든 참여자가 결정을 했을 때 승패 결과를 보낸다.
* [한번더] 버튼을 누른다.
	* 현재 있는 패를 서버에 반납
	* 한번 더 버튼 안보이게 한다.
	* 서버는 남은 패를 다시 섞어 2장을 보낸다.
* [다시 시작] 누르면 재진입

> 카드 20장만 사용하고, 족보는 38광땡, 장땡 ... 일땡,알리,독사,구삥,장삥,장사,세륙까지 있고, 이후에는 더한값의 숫자(끗수)가 높은 쪽이 승리한다.
