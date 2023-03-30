const KEY = "QWERTY#1234";

function encrypt(value) {
  var result = "";
  for (let i = 0; i < value.length; ++i) {
    result += String.fromCharCode(KEY[i % KEY.length] ^ value.charCodeAt(i));
  }
  return result;
}

function decrypt(value) {
  var result = "";
  for (let i = 0; i < value.length; ++i) {
    result += String.fromCharCode(KEY[i % KEY.length] ^ value.charCodeAt(i));
  }
  return result;
}

export { encrypt, decrypt };
