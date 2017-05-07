(function(){
  var data = document.querySelector('#centrifuge').dataset || {};
  var centrifuge = new Centrifuge({
    url: data.url,
    user: data.user,
    timestamp: data.timestamp,
    token: data.token
  });

  var msgcentrifuge = new Centrifuge({
    url: data.url,
    user: data.user,
    timestamp: data.timestamp,
    token: data.token
  });

  centrifuge.subscribe("news", function(message) {
    console.log(message);
    const popup = `
    <div style="
      bottom: 1px;
      position: fixed;
      width: 180px;
      height: 180px;
      background-color: #337ab7;
      border-color: #2e6da4;
      color: #fff;
      border-radius: 6px;
      padding: 5px 16px;
      margin: 1px;
      border-image: initial;
      align-items: flex-start;
      border-width: 2px;
      border-style: outset;">
        ${message.data.msg}
    </div>`;
    const el = document.createElement('div');
    el.innerHTML = popup;
    document.querySelector('.msg_list').append(el);
    setTimeout(function(){
      el.remove();
    }, 10000);
  });

  msgcentrifuge.subscribe("user" + data.user, function(message) {
    console.log(message);
    const popup = `
    <div style="
      bottom: 1px;
      position: fixed;
      width: 180px;
      height: 180px;
      background-color: #337ab7;
      border-color: #2e6da4;
      color: #fff;
      border-radius: 6px;
      padding: 5px 16px;
      margin: 1px;
      border-image: initial;
      align-items: flex-start;
      border-width: 2px;
      border-style: outset;">
        ${message.data.msg}
    </div>`;
    const el = document.createElement('div');
    el.innerHTML = popup;
    document.querySelector('.msg_list').append(el);
    setTimeout(function(){
      el.remove();
    }, 10000);
  });

  msgcentrifuge.connect();
  centrifuge.connect();
})();
