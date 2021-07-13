const hooks = [];
let currentComponent = -1;
export class Component {}
export function useState(initValue) {
  const position = currentComponent; // 캡쳐링

  if (!hooks[position]) {
    // 최초 호출 일때
    hooks[position] = initValue;
  }

  return [hooks[position], nextValue => {
    hooks[position] = nextValue;
  }];
}

function renderRealDOM(vdom) {
  if (typeof vdom === 'string') {
    return document.createTextNode(vdom);
  }

  if (vdom === undefined) {
    return;
  }

  const $el = document.createElement(vdom.tagName);
  vdom.children.map(renderRealDOM).forEach(node => {
    $el.appendChild(node);
  });
  return $el;
}

export const render = function () {
  let prevVdom = null;
  return function (nextVdom, container) {
    if (prevVdom === null) {
      prevVdom = nextVdom;
    } // diff algorithm


    container.appendChild(renderRealDOM(nextVdom));
  };
}();
export function createElement(tagName, props, ...children) {
  if (typeof tagName === 'function') {
    if (tagName.prototype instanceof Component) {
      // 클래스 컴포넌트
      const instance = new tagName({ ...props,
        children
      });
      return instance.render();
    } else {
      // 함수형 컴포넌트 (몇번을 호출해도 항상 같은 순서로 호출되는 것이 point!!)
      // 호출될 함수형 컴포넌트의 갯수가 똑같다는 전제

      /*
       * 함수형 컴포넌트가 렌더링될 때마다 Hooks가 동일한 순서로 호출되도록 하기 위해
       * 조건문, 루프 또는 중첩 함수 내부에서 Hooks를 호출할 수 없습니다.
       */
      currentComponent++;
      return tagName.apply(null, [props, ...children]);
    }
  }

  return {
    tagName,
    props,
    children
  };
}