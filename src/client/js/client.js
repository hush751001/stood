
import '../css/main.scss';
import Network from './network';
import {my} from './etc';

const network = new Network(location.origin);

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

