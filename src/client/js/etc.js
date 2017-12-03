/* 함수 export */
var makeCardsHtml = function(cards) {
  let strHtml = '';
  strHtml += '<li class="card card-' + cards[0].cardPictureIndex + '"></ll>';
  strHtml += '<li class="card card-' + cards[1].cardPictureIndex + '"></ll>';
  return strHtml;
}
export { makeCardsHtml }

/* 변수 export */
export var my = {
  nickname: '',
  id: ''
};