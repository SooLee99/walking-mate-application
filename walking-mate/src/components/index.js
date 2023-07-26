/**
 * @파일명 index.js
 * @작성자 이수
 * @작성일 2023-07-23
 * @코드설명
 *   여러 공통 컴포넌트들을 모아서 export합니다.
 *   이 파일을 import하면 한번에 여러 컴포넌트를 사용할 수 있습니다.
 */

import Button from './Button';
import ButtonText from './ButtonText';
import Input from './Input';
import ErrorMessage from './ErrorMessage';
import Spinner from './Spinner';
import EmailAuthInput from './InputBox';
//import Image from './Image';  // 현재 Image 컴포넌트는 사용하지 않고 있습니다.

export { Button, Input, ButtonText, ErrorMessage, Spinner, EmailAuthInput };
