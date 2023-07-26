/**
 * @파일명 index.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

const Colors = {
  white: '#ffffff',
  black: '#111111',
  grey0: '#d5d5d5',
  grey1: '#a6a6a6',
  main: '#00FEEF',
  red: '#e84118',
};

export const theme = {
  background: Colors.white,
  text: Colors.black,
  errorText: Colors.red,

  // Button
  btnBackground: Colors.main,
  btnTitle: Colors.white,
  btnTextLink: Colors.main,

  // Image
  imgBackground: Colors.grey0,

  // Input
  inputBackground: Colors.white,
  inputLabel: Colors.grey1,
  inputPlaceholder: Colors.grey1,
  inputBorder: Colors.grey1,

  // Spinner
  spinnerBackground: Colors.black,
  spinnerIndicator: Colors.white,
};
