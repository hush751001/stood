const shuffle = (arr) => {
  let input = arr;
   
  for (let i = input.length-1; i >=0; i--) {
   
      let randomIndex = Math.floor(Math.random()*(i+1)); 
      let itemAtIndex = input[randomIndex]; 
       
      input[randomIndex] = input[i]; 
      input[i] = itemAtIndex;
  }
  return input;
};

const cardIndexes = ['1','2','6','7','10','11','14','15','18','19','22','23','26','27','30','31','34','35','38','39'];
const cardInfos = {
  '1': {
    type: '띠',
    number: 1
  },
  '2': {
    type: '광',
    number: 1
  },
  '6': {
    type: '열끗',
    number: 2
  },
  '7': {
    type: '띠',
    number: 2
  },
  '10': {
    type: '광',
    number: 3
  },
  '11': {
    type: '띠',
    number: 3
  },
  '14': {
    type: '열끗',
    number: 4
  },
  '15': {
    type: '띠',
    number: 4
  },
  '18': {
    type: '열끗',
    number: 5
  },
  '19': {
    type: '띠',
    number: 5
  },
  '22': {
    type: '열끗',
    number: 6
  },
  '23': {
    type: '띠',
    number: 6
  },
  '26': {
    type: '띠',
    number: 7
  },
  '27': {
    type: '열끗',
    number: 7
  },
  '30': {
    type: '광',
    number: 8
  },
  '31': {
    type: '열끗',
    number: 8
  },
  '34': {
    type: '띠',
    number: 9
  },
  '35': {
    type: '열끗',
    number: 9
  },
  '38': {
    type: '띠',
    number: 10
  },
  '39': {
    type: '열끗',
    number: 10
  }
};

let pool;

// 초기 20장 섞어 놓기
function init() {
  pool = shuffle([...Array(20).keys()]);
}

// 2장 뽑기
function getTwoCards() {
  if(pool.length == 0) {
    return false;
  }

  let result = {};
  let cards = [];
  const cardIndex1 = pool.shift();
  const cardPictureIndex1 = cardIndexes[cardIndex1];
  cards.push(Object.assign({
    cardPictureIndex: cardPictureIndex1,
    cardIndex: cardIndex1,
  }, cardInfos[cardPictureIndex1]));

  const cardIndex2 = pool.shift();
  const cardPictureIndex2 = cardIndexes[cardIndex2];
  cards.push(Object.assign({
    cardPictureIndex: cardPictureIndex2,
    cardIndex: cardIndex2,
  }, cardInfos[cardPictureIndex2]));
  
  result.cards = cards;

  let cardNumber1 = cardInfos[cardPictureIndex1].number;
  let cardNumber2 = cardInfos[cardPictureIndex2].number;

  if((cardPictureIndex1 == '10' || cardPictureIndex1 == '30') &&
    (cardPictureIndex2 == '10' || cardPictureIndex2 == '30')) {
    result.title = '38광땡';
    result.number = 100000;
  }
  else if((cardPictureIndex1 == '2' || cardPictureIndex1 == '30') &&
    (cardPictureIndex2 == '2' || cardPictureIndex2 == '30')) {
    result.title = '18광땡';
    result.number = 100000;
  }
  else if((cardPictureIndex1 == '2' || cardPictureIndex1 == '10') &&
    (cardPictureIndex2 == '2' || cardPictureIndex2 == '10')) {
    result.title = '13광땡';
    result.number = 100000;
  }
  else if(cardNumber1 === cardNumber2) {
    result.title = cardNumber1 + '땡';
    result.number = cardNumber1 * 100;
  } else {
    if((cardNumber1 == 1 || cardNumber2 == 1) &&
      (cardNumber1 == 2 || cardNumber2 == 2)) {
        result.title = '알리';
        result.number = 90;
    } else if((cardNumber1 == 1 || cardNumber2 == 1) &&
      (cardNumber1 == 4 || cardNumber2 == 4)) {
        result.title = '독사';
        result.number = 80;
    } else if((cardNumber1 == 1 || cardNumber2 == 1) &&
      (cardNumber1 == 9 || cardNumber2 == 9)) {
        result.title = '구삥';
        result.number = 70;
    } else if((cardNumber1 == 1 || cardNumber2 == 1) &&
      (cardNumber1 == 10 || cardNumber2 == 10)) {
        result.title = '장삥';
        result.number = 60;
    } else if((cardNumber1 == 4 || cardNumber2 == 4) &&
      (cardNumber1 == 10 || cardNumber2 == 10)) {
        result.title = '장사';
        result.number = 50;
    } else if((cardNumber1 == 4 || cardNumber2 == 4) &&
      (cardNumber1 == 6 || cardNumber2 == 6)) {
        result.title = '세륙';
        result.number = 40;
    } else {
      let number = (cardNumber1 + cardNumber2) % 10;
      if(number == 0) {
        result.title = '망통';
      } else if(number == 9) {
        result.title = '갑오';
      } else {
        result.title = number + '끗';
      }
      result.number = number;
    }
  }

  return result;
}

// 카드 반납
function putBack(data) {
  // 0~19의 숫자
  pool.push(data.cards[0].cardIndex);
  pool.push(data.cards[1].cardIndex);
  pool = shuffle(pool);
}

module.exports = {
  init: init,
  getTwoCards: getTwoCards,
  putBack: putBack
};
