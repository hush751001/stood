import { CardInfos } from "./network";

/* 함수 export */
var makeCardsHtml = function(cardInfo: CardInfos) : string {
  let strHtml = '';
  strHtml += '<li class="card card-' + cardInfo.cards[0].cardPictureIndex + '"></ll>';
  strHtml += '<li class="card card-' + cardInfo.cards[1].cardPictureIndex + '"></ll>';
  return strHtml;
}
export { makeCardsHtml }

export interface My {
  nickname: string;
  id: string;
}

/* 변수 export */
export var my : My = {
  nickname: '',
  id: ''
};