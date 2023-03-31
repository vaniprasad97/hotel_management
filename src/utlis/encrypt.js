const KEY = "QWERTY#1234";

function encrypt(value) {
  var result = "";
  for (let i = 0; i < value.length; ++i) {
    result += String.fromCharCode(KEY[i % KEY.length] ^ value.charCodeAt(i));
  }

  return result;
  // The function defines a constant string named KEY, which is used as a key to encrypt the input value
}

function decrypt(value) {
  var result = "";
  for (let i = 0; i < value.length; ++i) {
    result += String.fromCharCode(KEY[i % KEY.length] ^ value.charCodeAt(i));
  }
  return result;
  //  function named "decrypt"
  // that takes an encrypted string as an argument and returns the original decrypted string.
}

export { encrypt, decrypt };
