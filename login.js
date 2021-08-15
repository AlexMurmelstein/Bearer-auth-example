function sendMessage() {
  let xhr = new XMLHttpRequest();
  xhr.open('POST', 'http://localhost:8000/login');
  xhr.setRequestHeader('header', 'tokenToBePutHere')

  xhr.send();
  
  xhr.onload = function() {
      console.log(xhr.response);
  };
}