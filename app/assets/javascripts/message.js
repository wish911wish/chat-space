$(document).on("turbolinks:load", function() {

  function buildHTML(message){
    var htmlMessageImage = ""

    if (message.image.url){
      htmlMessageImage = `<img src="${message.image.url}" >`
    }

    var htmlMessage = `
    <div class="message" message_id="${message.id}">
      <div class="message__data">
        <span class="message__user">
        ${message.name}
        </span>
        <span class="message__date">
        ${message.created_at}
        </span>
      </div>
      <div class="message__text">${message.content}</div>
      ${htmlMessageImage}
    </div>`
    $('.js-message-list').append(htmlMessage);
  }

  function buildUserList(user){
    var htmlUserList = `
    <div class="chat-group-user clearfix">
      <p class="chat-group-user__name">${user.name}</p>
      <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
    </div>`
    $('#user-search-result').append(htmlUserList);
  }

  function buildChatMemberList(chatMembar){
    var htmlChatMemberList = `
    <div class="chat-group-user clearfix js-chat-member" id="chat-group-user-${chatMembar.attr("data-user-id")}">
      <input name="group[user_ids][]" type="hidden" value="${chatMembar.attr("data-user-id")}">
      <p class="chat-group-user__name">${chatMembar.attr("data-user-name")}</p>
      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
    </div>`
    $('#user-additional-target').append(htmlChatMemberList);
  }

  autoUpdateMessage = function(){
    var url = location.href
    var lastMessageId = $('.message').last().attr("message_id")
    $.ajax({
      url: url,
      type: "GET",
      data: { last_messate_id: lastMessageId },
      dataType: 'json',
    })
    .done(function(messages){
      messages.forEach(function(message){
        buildHTML(message);
        $('.js-message-list').animate({scrollTop: $('.js-message-list')[0].scrollHeight}, 500, 'swing');
      })
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr("action")
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      buildHTML(message)
      $('.js-message-list').animate({scrollTop: $('.js-message-list')[0].scrollHeight}, 500, 'swing');
      $('.js-message-content').val('');
    })
    .fail(function(){
      alert('メッセージの送信に失敗しました');
    })
    .always(function(){
      $(".input-area__button").removeAttr("disabled");
    });
  })

  $('#user-search-field').on('keyup', function() {
    var input = $('#user-search-field').val()
    $.ajax({
      url: '/users',
      type: "GET",
      data: { keyword: input },
      dataType: 'json',
    })
    .done(function(users) {
      $('#user-search-result').empty()
      users.forEach(function(user){
        buildUserList(user)
      })
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    })
  })

  $(document).off('click', '.chat-group-user__btn--add');
  $(document).on('click', '.chat-group-user__btn--add', function(){
    $(this).closest('.chat-group-user').remove()
    buildChatMemberList($(this))
  })

  $(document).off('click', '.chat-group-user__btn--remove');
  $(document).on('click', '.chat-group-user__btn--remove', function(){
    $(this).closest('.chat-group-user').remove()
  })

  if ($(".main__group")[0]){
    if (window.set_timer_on == null || window.set_timer_on == false){
      window.timer = setInterval('autoUpdateMessage()', 5000);
      window.set_timer_on = true;
    }
  }
  else{
    clearInterval(window.timer)
    window.timer = null
    window.set_timer_on = false;
  }
});
