import cookie from 'react-cookie';

export function post(url, requestuestBody) {
  const csrftoken = cookie.load('csrftoken');
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
  .then((response) => {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  })
  .then((response) =>  response.json())
  .catch(console.log);
}
