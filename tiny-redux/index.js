import { createStore} from "./redux";

const COUNTER = 'count';
const FETCH = 'fetch';

/*
 * reudx가 제공하는 모든 것들은 store에 담겨있다.
 * store에 전달하면 redux가 제공하는 도구들을 사용할 수 있다.
 */

// function middleware(dispatch, action) {
//   if (action.type === '비동기 작업') {
//    fetch().then(() => {
//     dispatch('응답');
//    })
//   }
// }

/* 커링 (함수형 프로그래밍)
 * 인자를 넘겨주고 그 다음 인자를 넘겨주는 타이밍을 코드 바깥에서 제어 가능 (함수를 분해)
 * redux 안쪽에서 middleware 타이밍을 잡을 수 있다.
 */
const middleware1 = (store) => (dispatch) => (action)  =>{
 /* 흘러가는 액션중에 비동기 작업을 중간에 가로채서
  * redux에게 주지 않고 그에 맞는 작업을 처리 후 dispatch
  */
 if (action.type === 'fetch') {
  setTimeout(() => {
   dispatch({
    type: 'fetch-response',
    payload: [
      1,2,3
    ]
   });
  }, 2000);
 } else {
  dispatch(action);
 }
}
// const middleware2 = (store) => (dispatch) => (action)  =>{
//  console.log('mid 2');
//  dispatch(action);
// }
//

/*
 * reducer는 동기프로세스 전제로 설계되었기 떄문에 비동기 작업을 처리 불가
 * redux는 middleware라는 형태로 비동기 처리를 제공함
 */
function reducer(state, action) {
 if (action.type === COUNTER) {
  return {...state, count: action.payload.counter};
 }

 if (action.type === 'fetch-response') {
  return {...state, response: action.payload};
 }

 if (action.type === FETCH) {
  /* 아래 비동기 콜백작업은 promise가 resolve 됬을때 콜백 실행
   * 콜백이 작동은 하겠지만 이미 리듀서는 state를 return을 함
   * 콜백으로 전개되는 비동기 작업은 리덕스에세 state를 넘겨줄 방법이 없다.
   */
  fetch('').then(res => {
   res;
  })
 }

 return state;
}

function listener() {
 console.log(store.getState());
}

function actionCreator(type, payload) {
 return {
  type,
  payload,
 }
}

const store = createStore(reducer, [middleware1]);

// 변경을 통지 받을 수 있는 구조
store.subscribe(listener);

store.dispatch(actionCreator(COUNTER, {counter: 1}));

// 공통 관심사를 함수로 묶어서 코드 가동성 up
function counter(data) {
 store.dispatch(actionCreator(COUNTER, data));
}

counter({counter: 1});

store.dispatch(actionCreator(FETCH));
