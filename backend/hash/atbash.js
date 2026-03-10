export function atbashCipher(input) {
  return input
    .toLowerCase()
    .split("")
    .map((char) => {
      if (char >= "a" && char <= "z") {
        // a=97, z=122. Mirror: 97 + (122 - charCode) = 219 - charCode
        return String.fromCharCode(219 - char.charCodeAt(0));
      }
      return char;
    })
    .join("");
}