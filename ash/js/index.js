//Developed and written by Ashutosh Gupta using PubNub ChatEngine SDK on 11-06-2018
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
ChatEngine = ChatEngineCore.create({
    publishKey: 'pub-c-5f66e0a7-e375-446d-b573-26939e3c6df8',
    subscribeKey: 'sub-c-e08856de-c90e-11e7-96a3-6a84acea123e'
});
const init = () => {
  var count = 0;
  ChatEngine.connect('Ashutosh', {
    team: 'red'
});
  ChatEngine.on('$.ready', (data) => {
    var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

    const updateScrollbar = () => {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
};
const setDate = () => {
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
};
    const insertMessage = () => {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  lobby.emit('ashu', {
    text: msg
  });
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
};
    let me = data.me;
    let lobby = new ChatEngine.Chat('pashabhai86');
    lobby.on('$.offline.*', (data) => {
    $('#online').text('Online');
    });
    lobby.emit( 'ashujoin', {
            ashu:'ashu'            
        } );
       lobby.on('madamjoin', (data) => {   
        $('#online').text('Online');
        lobby.emit( 'ashujoin', {
            ashu:'ashu'})           
        });
  $('.message-submit').click(function() {
  insertMessage();
});
  $(".message-input").keyup(function(){
    msg = $('.message-input').val();
  if (!$.trim(msg) == '' && count == 0) {
    lobby.emit( 'ashutyping', {
            ashu:'ashu'})
    count++; 
  }
  if($.trim(msg) == '' && count == 1)
    {lobby.emit( 'ashustoptyping', {
            ashu:'ashu'})
        count--;
      }
});
$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})
lobby.on('madam', (payload) => {
    setDate();
    $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + payload.data.text + '</div>').appendTo($('.mCSB_container')).addClass('new');
    updateScrollbar();
});
lobby.on('madamtyping', (payload) => {
    $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
    updateScrollbar();
});
lobby.on('madamstoptyping', (payload) => {
    $('.message.loading').remove();
    updateScrollbar();
});
});
};


$(window).load(function() {
  $messages.mCustomScrollbar();
});

var Fake = [
  'Hi there, I\'m Fabio and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'Codepen is a nice place to stay',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)'
]

function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);

}
init();