/* eslint-disable import/no-cycle */
import { inputText, keyboardContainer } from './const.js';
import { searchValue } from '../script.js';

let lang = 'eng';
const wrapperKeyboard = document.createElement('div');
const langHint = document.createElement('p');
const langHintValue = document.createElement('span');
const keyboard = document.createElement('div');
const capsLight = document.createElement('span');
const closeKeyboardButton = document.createElement('span');
const buttonArray = [];
const symbolButtonArray = [];

function changeLang() {
  if (lang === 'eng') {
    lang = 'ru';
  } else {
    lang = 'eng';
  }
  symbolButtonArray.forEach((item) => {
    if (lang === 'eng') {
      item.langValue = item.EngValue;
    } else {
      item.langValue = item.RuValue;
    }
    if (typeof item.langValue === 'string') {
      item.innerHTML = item.langValue.toUpperCase();
    } else {
      item.innerHTML = item.langValue[0];
    }
  });
  langHintValue.innerHTML = lang;
}

function preventDefaultKeyPress(event) {
  event.preventDefault();
}

function keydownListener(event) {
  for (let index = 0; index < buttonArray.length; index++) {
    if (event.code === buttonArray[index].keyCode) {
      buttonArray[index].classList.add('button_push');
      if ((event.code !== 'ArrowRight') && (event.code !== 'ArrowLeft') && (event.code !== 'ArrowDown') && (event.code !== 'ArrowUp') && (event.code !== 'ArrowUp') && (event.code !== 'ArrowUp') && (event.code !== 'Backspace') && (event.code !== 'Delete')) {
        const myEvent = new Event('mousedown', { bubbles: true });
        buttonArray[index].dispatchEvent(myEvent);
      }
    }
  }
}

function keyupListener(event) {
  for (let index = 0; index < buttonArray.length; index++) {
    if (event.code === buttonArray[index].keyCode) {
      buttonArray[index].classList.remove('button_push');
      if ((event.code !== 'ArrowRight') && (event.code !== 'ArrowLeft') && (event.code !== 'Backspace') && (event.code !== 'Delete')) {
        const myEvent = new Event('mouseup', { bubbles: true });
        buttonArray[index].dispatchEvent(myEvent);
      }
    }
  }
}

function closeKeyboard() {
  keyboardContainer.style.display = 'none';
  inputText.removeEventListener('keypress', preventDefaultKeyPress);
  document.removeEventListener('keydown', keydownListener);
  document.removeEventListener('keyup', keyupListener);
}

function createKeyboard() {
  wrapperKeyboard.classList.add('wrapper-keyboard');
  keyboardContainer.append(wrapperKeyboard);
  wrapperKeyboard.append(closeKeyboardButton);
  wrapperKeyboard.append(langHint);
  wrapperKeyboard.append(keyboard);
  keyboard.append(capsLight);
  langHint.append(langHintValue);
  langHint.append('Press CTRL + ALT to change the language');
  closeKeyboardButton.classList.add('close-keyboard');
  langHint.classList.add('lang-hint');
  keyboard.classList.add('keyboard');
  langHintValue.classList.add('lang-value');
  langHintValue.innerHTML = lang;
  capsLight.classList.add('cals-lock');
  const symbolButtonValues = [['Backquote', 1, ['`', '~'], 'ё'], ['Digit1', 2, ['1', '!'], ['1', '!']], ['Digit2', 3, ['2', '@'], ['2', '"']], ['Digit3', 4, ['3', '#'], ['3', '№']], ['Digit4', 5, ['4', '$'], ['4', ';']], ['Digit5', 6, ['5', '%'], ['5', '%']], ['Digit6', 7, ['6', '^'], ['6', ':']], ['Digit7', 8, ['7', '&'], ['7', '?']], ['Digit8', 9, ['8', '*'], ['8', '*']], ['Digit9', 10, ['9', '('], ['9', '(']], ['Digit0', 11, ['0', ')'], ['0', ')']], ['Minus', 12, ['-', '_'], ['-', '_']], ['Equal', 13, ['=', '+'], ['=', '+']], ['KeyQ', 16, 'q', 'й'], ['KeyW', 17, 'w', 'ц'], ['KeyE', 18, 'e', 'у'], ['KeyR', 19, 'r', 'к'], ['KeyT', 20, 't', 'е'], ['KeyY', 21, 'y', 'н'], ['KeyU', 22, 'u', 'г'], ['KeyI', 23, 'i', 'ш'], ['KeyO', 24, 'o', 'щ'], ['KeyP', 25, 'p', 'з'], ['BracketLeft', 26, ['[', '{'], 'х'], ['BracketRight', 27, [']', '}'], 'ъ'], ['Backslash', 28, ['\\', '|'], ['\\', '/']], ['KeyA', 31, 'a', 'ф'], ['KeyS', 32, 's', 'ы'], ['KeyD', 33, 'd', 'в'], ['KeyF', 34, 'f', 'а'], ['KeyG', 35, 'g', 'п'], ['KeyH', 36, 'h', 'р'], ['KeyJ', 37, 'j', 'о'], ['KeyK', 38, 'k', 'л'], ['KeyL', 39, 'l', 'д'], ['Semicolon', 40, [';', ':'], 'ж'], ['Quote', 41, ["'", '"'], 'э'], ['IntlBackslash', 44, ['\\', '|'], ['\\', '/']], ['KeyZ', 45, 'z', 'я'], ['KeyX', 46, 'x', 'ч'], ['KeyC', 47, 'c', 'с'], ['KeyV', 48, 'v', 'м'], ['KeyB', 49, 'b', 'и'], ['KeyN', 50, 'n', 'т'], ['KeyM', 51, 'm', 'ь'], ['Comma', 52, [',', '<'], 'б'], ['Period', 53, ['.', '>'], 'ю'], ['Slash', 54, ['/', '?'], ['.', ',']]];
  const specialButtonValues = [['Escape', 0, 'ESC', clearFunc, undefinedFunc], ['Delete', 29, 'DEL', deleteFunc, undefinedFunc, '95px'], ['Tab', 15, 'TAB', tabFunc, undefinedFunc, '95px'], ['Backspace', 14, 'BACKSPACE', backFunc, undefinedFunc, '140px'], ['CapsLock', 30, 'CAPS LOCK', capsLockFunc, undefinedFunc, '120px'], ['Enter', 42, 'ENTER', enterFunc, undefinedFunc, '190px'], ['ArrowUp', 55, '&#8593', arrowUpFunc, undefinedFunc], ['OSLeft', 58, 'WIN', winFunc, undefinedFunc], ['Space', 60, '&#160', spaceFunc, undefinedFunc, '400px'], ['ArrowLeft', 63, '&#8592', arrowLeftFunc, undefinedFunc], ['ArrowDown', 64, '&#8595', arrowDownFunc, undefinedFunc], ['ArrowRight', 65, '&#8594', arrowRightFunc, undefinedFunc], ['ShiftLeft', 43, 'SHIFT', shiftFunc, unShiftFunc, '140px'], ['ShiftRight', 56, 'SHIFT', shiftFunc, unShiftFunc, '110px'], ['ControlLeft', 57, 'CTRL', ctrlFunc, unCtrlFunc, '90px'], ['AltLeft', 59, 'ALT', altFunc, unAltFunc], ['AltRight', 61, 'ALT', altFunc, unAltFunc], ['ControlRight', 62, 'CTRL', ctrlFunc, unCtrlFunc]];
  let iButton;
  let isShift = false;
  let isCtrl = false;
  let isAlt = false;
  let isCaps = false;
  let сapsCounter = 0;

  langHintValue.addEventListener('click', () => {
    changeLang();
    inputText.focus();
  });

  function undefinedFunc() {
    return false;
  }
  function winFunc() {
    return false;
  }
  function clearFunc() {
    inputText.setRangeText('', 0, inputText.selectionEnd + 1, 'end');
  }
  function deleteFunc() {
    if (inputText.selectionStart !== inputText.selectionEnd) {
      inputText.setRangeText('', inputText.selectionStart, inputText.selectionEnd, 'end');
    } else {
      inputText.setRangeText('', inputText.selectionStart, inputText.selectionEnd + 1, 'end');
    }
  }
  function backFunc() {
    if (inputText.selectionStart !== inputText.selectionEnd) {
      inputText.setRangeText('', inputText.selectionStart, inputText.selectionEnd, 'end');
    } else if (inputText.selectionStart > 0) {
      inputText.setRangeText('', inputText.selectionStart - 1, inputText.selectionEnd, 'end');
    }
  }
  function capsLockFunc() {
    сapsCounter++;
    if (сapsCounter % 2 === 1) {
      isCaps = true;
      capsLight.classList.add('cals-lock_green');
    } else {
      isCaps = false;
      capsLight.classList.remove('cals-lock_green');
    }
  }
  function shiftFunc() {
    isShift = true;
  }
  function unShiftFunc() {
    isShift = false;
  }
  function altFunc() {
    isAlt = true;
    if ((isCtrl === true) && (isAlt === true)) {
      changeLang();
    }
  }
  function ctrlFunc() {
    isCtrl = true;
    if ((isCtrl === true) && (isAlt === true)) {
      changeLang();
    }
  }
  function unAltFunc() {
    isAlt = false;
  }
  function unCtrlFunc() {
    isCtrl = false;
  }
  function spaceFunc() {
    inputText.setRangeText(' ', inputText.selectionStart, inputText.selectionEnd, 'end');
  }
  function enterFunc() {
    closeKeyboard();
    searchValue(inputText.value);
  }
  function tabFunc() {
    inputText.setRangeText('\t', inputText.selectionStart, inputText.selectionEnd, 'end');
  }
  function arrowRightFunc() {
    const start = inputText.selectionStart;
    const end = inputText.selectionEnd;
    if (start === end) {
      inputText.selectionStart = start + 1;
      inputText.selectionEnd = start + 1;
    }
  }
  function arrowLeftFunc() {
    const start = inputText.selectionStart;
    const end = inputText.selectionEnd;
    if ((start === end) && (start !== 0)) {
      inputText.selectionStart = start - 1;
      inputText.selectionEnd = start - 1;
    }
  }
  function arrowDownFunc() {
    inputText.setRangeText('\u2193', inputText.selectionStart, inputText.selectionEnd, 'end');
  }
  function arrowUpFunc() {
    inputText.setRangeText('\u2191', inputText.selectionStart, inputText.selectionEnd, 'end');
  }
  class SymbolButton extends HTMLButtonElement {
    constructor() {
      super();
      this.setAttribute('type', 'button');
      this.classList.add('button_base');
      this.keyCode = symbolButtonValues[iButton][0];
      this.EngValue = symbolButtonValues[iButton][2];
      this.RuValue = symbolButtonValues[iButton][3];
      if (lang === 'eng') {
        this.langValue = this.EngValue;
      } else {
        this.langValue = this.RuValue;
      }
      if (typeof this.langValue === 'string') {
        this.innerHTML = this.langValue.toUpperCase();
      } else {
        this.innerHTML = this.langValue[0];
      }
      this.addEventListener('mousedown', () => {
        if (typeof this.langValue === 'string') {
          if (isShift) {
            if (!isCaps) {
              this.inputValue = this.langValue.toUpperCase();
            } else {
              this.inputValue = this.langValue;
            }
          } else if (isCaps) {
            this.inputValue = this.langValue.toUpperCase();
          } else {
            this.inputValue = this.langValue;
          }
        } else if (isShift) {
          this.inputValue = this.langValue[1];
        } else {
          this.inputValue = this.langValue[0];
        }
        inputText.setRangeText(this.inputValue, inputText.selectionStart, inputText.selectionEnd, 'end');
        inputText.focus();
      });
      this.addEventListener('mouseup', () => {
        inputText.focus();
      });
    }
  }
  customElements.define('letter-a', SymbolButton, { extends: 'button' });
  for (iButton = 0; iButton < symbolButtonValues.length; iButton++) {
    const j = symbolButtonValues[iButton][1];
    buttonArray[j] = document.createElement('button', { is: 'letter-a' });
    symbolButtonArray[iButton] = buttonArray[j];
  }
  class SpecialButton extends HTMLButtonElement {
    constructor() {
      super();
      this.setAttribute('type', 'button');
      this.classList.add('button_special');
      this.keyCode = specialButtonValues[iButton][0];
      this.innerHTML = specialButtonValues[iButton][2];
      if (specialButtonValues[iButton][5]) {
        this.style.width = specialButtonValues[iButton][5];
      }
      this.addEventListener('mousedown', specialButtonValues[iButton][3]);
      this.addEventListener('mouseup', specialButtonValues[iButton][4]);
      this.addEventListener('mouseup', () => {
        inputText.focus();
      });
    }
  }
  customElements.define('letter-s', SpecialButton, { extends: 'button' });
  for (iButton = 0; iButton < specialButtonValues.length; iButton++) {
    const j = specialButtonValues[iButton][1];
    buttonArray[j] = document.createElement('button', { is: 'letter-s' });
  }
  for (let index = 0; index < buttonArray.length; index++) {
    keyboard.append(buttonArray[index]);
  }
}
function keyboardWorking() {
  inputText.addEventListener('keypress', preventDefaultKeyPress);
  document.addEventListener('keydown', keydownListener);
  document.addEventListener('keyup', keyupListener);
  closeKeyboardButton.addEventListener('click', closeKeyboard);
}

export { createKeyboard, keyboardWorking, closeKeyboard };
