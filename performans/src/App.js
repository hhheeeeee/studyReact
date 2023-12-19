import "./App.css";
import { useState, useTransition, useDeferredValue } from "react";

let a = new Array(10000).fill(0);

function App() {
  let [name, setName] = useState("");
  let [isPending, startTransition] = useTransition();
  let state1 = useDeferredValue(name);
  return (
    <div className="App">
      <div>
        <input
          onChange={(e) => {
            startTransition(() => {
              setName(e.target.value);
            });
          }}
        />

        {isPending
          ? "로딩중기다리셈"
          : a.map(() => {
              return <div>{state1}</div>;
            })}
      </div>
      <div className="description">
        <div>
          <p>
            automatic batching 이라는 기능이 있는데 state변경함수를 연달아서 3개
            사용하면 재렌더링도 원래 3번 되어야하지만{" "}
          </p>
          <p>재렌더링을 마지막에 1회만 처리해줍니다. </p>
          <p>일종의 쓸데없는 재렌더링 방지기능이고 batching이라고 합니다.</p>
        </div>
        <div>
          <p>
            근데 문제는 ajax요청, setTimeout안에 state변경함수가 있는 경우
            batching이 일어나지 않습니다.{" "}
          </p>
          <p>
            리액트 17버전까진 그런 식으로 일관적이지 않게 동작했는데 18버전 이후
            부터는 어디 있든 간에 재렌더링은 마지막에 1번만 됩니다.
          </p>
        </div>
        <div>
          batching 되는게 싫고 state변경함수 실행마다 재렌더링시키고 싶으면
          flushSync라는 함수를 쓰면 됩니다. 필요하면 찾아봅시다.
        </div>
        <hr />
        <h4>isPending은 어디다 쓰냐면 </h4>
        <p>
          startTransition() 으로 감싼 코드가 처리중일 때 true로 변하는
          변수입니다.
        </p>
        <hr />
        <h4>useTransition</h4>
        <p>렌더링시간이 매우 오래걸리는 컴포넌트가 있다고 칩시다. </p>
        <p>버튼클릭, 타이핑할 때 마다 그 컴포넌트를 렌더링해야한다면</p>
        <p>이상하게 버튼클릭, 타이핑 반응속도도 느려집니다. </p>
        <p>
          사람들은 원래 클릭, 타이핑을 했을 때 0.3초 이상 반응이 없으면 불편함을
          느끼기 때문에 (한국인은 0.2초)
        </p>
        <p>당연히 그 컴포넌트 안의 html 갯수를 줄이면 대부분 해결됩니다. </p>
        <p>근데 그런게 안되면 useTransition 기능을 쓰면 됩니다.</p>
        <hr />

        <h4>useDeferredValue 이것도 비슷함</h4>
        <p>startTransition() 이거랑 용도가 똑같습니다.</p>
        <p>근데 얘는 state 아니면 변수하나를 집어넣을 수 있게 되어있습니다. </p>
        <p>그래서 그 변수에 변동사항이 생기면 그걸 늦게 처리해줍니다. </p>
      </div>
    </div>
  );
}

export default App;
