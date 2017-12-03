let my = {
  nickname: '',
  id: ''
}

$(function() {
  // 게임참여 버튼을 눌렀을 때, 2장을 서버에서 받아서 표시한다.
  $('.js-btn-join').on('click', (e) => {
    const nickname = $('#nickname').val();
    if(!nickname) {
      alert('닉네임을 입력하세요.');
      return;
    }
    network.join(nickname);
    my.nickname = nickname;

    $('#nickname').parent().hide();
    $('.js-btn-join').hide();
    $('.js-btn-call').show();
    $('.js-btn-onemore').show();
  });

  // 결정을 한다. 
  $('.js-btn-call').on('click', (e) => {
    network.call();

    $('.js-btn-call').prop('disabled', true);
    $('.js-btn-onemore').prop('disabled', true);
  });

  $('.js-btn-onemore').on('click', (e) => {
    network.onemore();

    $('.js-btn-onemore').hide();
  });

  $('.js-btn-reset').on('click', (e) => {
    location.reload();
  });
});

function makeCardsHtml(cards) {
  let strHtml = '';
  strHtml += '<li class="card card-' + cards[0].cardPictureIndex + '"></ll>';
  strHtml += '<li class="card card-' + cards[1].cardPictureIndex + '"></ll>';
  return strHtml;
}

//################### Network

(function() {
  let socket;

  window.network = {};

  function join(nickname) {
    socket.emit('join', nickname);
  }

  function call() {
    socket.emit('call');
  }

  function onemore() {
    socket.emit('onemore');
  }

  function init(url) {
    // socket서버에 접속
    socket = io.connect(url);

    // 접속이 되었을 때 받는 event 등록
    socket.on('connect', (data) => {
      console.log('connected');
    });

    socket.on('set id', (id) => {
      my.id = id;
    });

    // 게임참여 시 받는 event 등록
    socket.on('joined', (usernames) => {
      if(usernames.length >= 2) { // 입장한 사람이 2명이상일 때 결정버튼을 활성화한다.
        $('.js-btn-call').prop('disabled', false);
      } else {
        $('.js-btn-call').prop('disabled', true);
      }
    });

    // 카드 2장의 정보를 받는다
    socket.on('sendCards', (data) => {
      console.log(data);
      const strHtml = makeCardsHtml(data.cards);
      $('.my-card-list').html(strHtml);

      $('.my-title').text(data.title);
    });

    // 20장의 카드를 모두 나눠주었을 때 받는 event
    socket.on('noCard', (message) => {
      alert('나눠줄 카드가 없습니다.');
    });

    // 결정 버튼을 누군가 눌렀을 때 발생하는 이벤트
    socket.on('called', (usernames) => {
      let strHtml = '';
      usernames.forEach((name)=>{
        strHtml += `<li>${name}</li>`
      });

      $('#called-people').html(strHtml);
      $('#called-people-wrap').show();
    });

    // 게임의 승자 정보를 알려주는 이벤트
    socket.on('win', (name, data, id) => {
      console.log(name);
      console.log(data.title);

      $('#winner-wrap').show();
      $('#winner-name').text(name);
      $('#winner-title').text(data.title);
      const strHtml = makeCardsHtml(data.cards);
      $('.winner-card-list').html(strHtml);

      $('.js-btn-call').hide();
      $('.js-btn-reset').show();

      if(my.id == id) {
        alert('이겼다.');
      } else {
        alert('졌다.');
      }
    });
  }

  window.network.join = join;
  window.network.init = init;
  window.network.call = call;
  window.network.onemore = onemore;
})();


network.init(location.origin);
