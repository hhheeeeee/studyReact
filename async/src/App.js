import { useEffect, useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(20);

  useEffect(() => {
    if (count !== 0 && count < 3) {
      setAge(age + 1);
    }
  }, [count]);

  return (
    <div>
      <div>안녕하십니까 전 {age}</div>
      <button
        // 근데 count 가 3 이상이면 더 이상 age라는 state를 1 더하지 말도록
        onClick={() => {
          setCount(count + 1);
        }}
      >
        누르면한살먹기
      </button>
    </div>
  );
}

export default App;
