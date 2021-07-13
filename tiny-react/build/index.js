/* @jsx createElement */
// 지시어
import { createElement, render, Component } from './react.js';

class YourTitle extends Component {
  render() {
    return createElement("p", null, "\uD074\uB798\uC2A4 \uCEF4\uD3EC\uB10C\uD2B8\uB85C jsx...\uB9AC\uD134");
  }
}

function Title() {
  return createElement("div", null, createElement("h2", null, "\uB3D9\uC791?"), createElement("p", null, "work is well?"), createElement(YourTitle, null));
}

render(createElement(Title, null), document.querySelector('#root'));