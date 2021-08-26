export default function http(path, method, body = {}, token = null) {
    console.log('http request sending');

    const headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8',
    })
    
    if(token) {
        headers.append('Authorization', 'Bearer ' + token)
    }

    return fetch('http://localhost:5000' + path,  {
      method,
      body: Object.keys(body).length === 0 ? null : JSON.stringify(body),
      credentials: "omit",
      headers: headers,
      mode: 'cors'
    }).then((response) => {
      let jsonPromise = response.json();
  
      if (response.status >= 400) {
        return jsonPromise.then(response => {
          throw response;
        })
      }
  
      return jsonPromise
    })
  }