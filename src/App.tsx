import { useState } from "react";
import "./tailwind.css";

const App = () => {
  console.log("hello from App.tsx:5");

  const [count, setCount] = useState(0);

  return (
    <div className="bg-[#eee] h-[100vh] flex items-center justify-center flex-col">
      <h2>othello</h2>
      <h2>{count}</h2>
      <button onClick={() => setCount((count) => count + 1)}>increase</button>
    </div>
  );
};

export default App;
