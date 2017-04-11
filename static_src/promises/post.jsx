import cookie from 'react-cookie';

export function post(url, requestuestBody) {
  console.log('result:', requestuestBody);
  const csrftoken = cookie.load('csrftoken');
  fetch(url, {
    method: 'post',
    credentials: "same-origin",
    body: requestuestBody,
    headers: {
      "X-CSRFToken": csrftoken,
    }
  })
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
