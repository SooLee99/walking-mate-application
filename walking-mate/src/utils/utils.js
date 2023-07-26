/**
 * @파일명 utils.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  return text.replace(/\s/g, '');
};
