
import * as io from 'socket.io-client';
import {makeCardsHtml, my} from './etc';

export interface CardInfos {
  title: string;
  cards: Array<CardInfo>;
}

export interface CardInfo {
  cardPictureIndex: number;
}

export class Network {
  socket: any;

  constructor(url) {
    let socket = io.connect(url);

    // 접속이 되었을 때 받는 event 등록
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('set id', (id: string) => {
      my.id = id;
    });

    // 게임참여 시 받는 event 등록
    socket.on('joined', (usernames: Array<string>) => {
      if(usernames.length >= 2) { // 입장한 사람이 2명이상일 때 결정버튼을 활성화한다.
        $('.js-btn-call').prop('disabled', false);
      } else {
        $('.js-btn-call').prop('disabled', true);
      }
    });

    // 카드 2장의 정보를 받는다
    socket.on('sendCards', (data: CardInfos) => {
      console.log(data);
      const strHtml = makeCardsHtml(data);
      $('.my-card-list').html(strHtml);

      $('.my-title').text(data.title);
    });

    // 20장의 카드를 모두 나눠주었을 때 받는 event
    socket.on('noCard', () => {
      alert('나눠줄 카드가 없습니다.');
    });

    // 결정 버튼을 누군가 눌렀을 때 발생하는 이벤트
    socket.on('called', (usernames: Array<string>) => {
      let strHtml = '';
      usernames.forEach((name)=>{
        strHtml += `<li>${name}</li>`
      });

      $('#called-people').html(strHtml);
      $('#called-people-wrap').show();
    });

    // 게임의 승자 정보를 알려주는 이벤트
    socket.on('win', (name: string, data: CardInfos, id: string) => {
      console.log(name);
      console.log(data.title);

      $('#winner-wrap').show();
      $('#winner-name').text(name);
      $('#winner-title').text(data.title);
      const strHtml = makeCardsHtml(data);
      $('.winner-card-list').html(strHtml);

      $('.js-btn-call').hide();
      $('.js-btn-reset').show();

      if(my.id == id) {
        alert('이겼다.');
      } else {
        alert('졌다.');
      }
    });

    this.socket = socket;
  }

  join(nickname) {
    this.socket.emit('join', nickname);
  }

  call() {
    this.socket.emit('call');
  }

  onemore() {
    this.socket.emit('onemore');
  }
}
