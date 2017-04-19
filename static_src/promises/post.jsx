import cookie from 'react-cookie';

export function post(url, requestuestBody) {
  const csrftoken = cookie.load('csrftoken');
  let result = 0;
  fetch(url, {
    method: 'post',
    credentials: "same-origin",
    body: JSON.stringify(requestuestBody),
    headers: {
      "X-CSRFToken": csrftoken,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
  .then((response) => response.json())
  .then((response) =>  console.log(response))
  .catch(console.log);
  console.log(result);
  // return result;
}
