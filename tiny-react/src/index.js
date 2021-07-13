/* @jsx createElement */ // 지시어
import { createElement, render, Component } from './react.js';

class YourTitle extends Component{
	render() {
		return (
			<p>클래스 컴포넌트로 jsx...리턴</p>
		)
	}
}

function Title() {
	return (
		<div>
			<h2>동작?</h2>
			<p>work is well?</p>
			<YourTitle />
		</div>
	);
}

console.log(Title())

render(<Title />, document.querySelector('#root'));
