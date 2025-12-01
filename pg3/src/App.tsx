import { useState } from "react";
import "./App.css";

function App() {
  console.log("--------");
  const [n, setN] = useState(0);
  const fib = (n: number): number => {
    console.log(n);
    if (n <= 1) {
      return n;
    }
    return fib(n - 1) + fib(n - 2);
  };
  return (
    <div className="App">
      <button onClick={() => setN((count) => count + 1)}>
        fib is {fib(n)}
      </button>
      <div>
        <label htmlFor="fib-input">n =</label>
        <input
          id="fib-input"
          value={n}
          onChange={(e) => setN(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default App;
