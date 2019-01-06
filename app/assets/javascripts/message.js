$(function() {

  function buildHTML(message){
    var htmlMessageImage = ""
    var htmlMessage = ""

    if (message.image.url){
      htmlMessageImage = `<img src="${message.image.url}" >`
    }

    htmlMessage = `
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
    .done(function(messages){
      var lastMessageId = $('.message').last().attr("message_id")
      messages.forEach(function(message){
        if (lastMessageId < message.id) {
          buildHTML(message);
        }
      })
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
});
