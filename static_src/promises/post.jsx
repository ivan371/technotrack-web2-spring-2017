export function post(url, requestuestBody) {
  console.log('result:', requestuestBody);
  fetch(url, {
    method: 'post',
    credentials: "same-origin",
    body: requestuestBody
  })
  .then(function (data) {
    console.log('Request succeeded with JSON response', data);
  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}
