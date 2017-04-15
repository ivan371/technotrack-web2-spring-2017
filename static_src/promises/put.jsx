import cookie from 'react-cookie';

export function put(url, requestuestBody) {
  const csrftoken = cookie.load('csrftoken');
  fetch(url, {
    method: 'put',
    credentials: "same-origin",
    body: JSON.stringify(requestuestBody),
    headers: {
      "X-CSRFToken": csrftoken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
