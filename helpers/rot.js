function rotEncode(str, shift) {
  if (shift < 0) return rotEncode(str, shift + 26);

  const strAsArray = [...str];

  const shiftReducer = (acc, curr, i) => {
    const c = curr.charCodeAt();

    if (c >= 65 && c <= 90)
      return acc + String.fromCharCode(((c - 65 + shift) % 26) + 65);
    else if (c >= 97 && c <= 122)
      return acc + String.fromCharCode(((c - 97 + shift) % 26) + 97);

    return acc + str.charAt(i);
  };

  return strAsArray.reduce(shiftReducer, "");
}

module.exports.rotEncode = rotEncode;

function rotDecode(str, shift) {
  shift = (26 - shift) % 26;
  result = rotEncode(str, shift);
  return result;
}

module.exports.rotDecode = rotDecode;
