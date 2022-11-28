import { useState, useRef, useEffect } from 'react';
import './App.css';
import cad from './cad.json';

const allCurrencies = Object.values(cad);
allCurrencies.push({ code: 'CAD', name: 'Canadian Dollar', rate: 1 });
allCurrencies.sort((a, b) => {
  if (a.code < b.code) {
    return -1;
  }
  if (a.code > b.code) {
    return 1;
  }
  return 0;
});
const options = allCurrencies.map(m => <option key={m.code} value={`${JSON.stringify({ code: m.code, rate: m.rate })}`}>{`${m.code} - ${m.name}`}</option>);

function App() {

  const [result, setResult] = useState(null);

  const amountInputEleRef = useRef(null);

  useEffect(() => {
    amountInputEleRef.current.focus();
  }, []);

  function handleSumbit(event) {
    event.preventDefault();
    let { amount, from, to } = event.target;
    amount = Number(amount.value);
    from = JSON.parse(from.value);
    to = JSON.parse(to.value);
    const result = to.rate / from.rate * amount;
    setResult(`${amount} ${from.code} = ${result} ${to.code}`);
    amountInputEleRef.current.focus();
  }

  return (
    <>
      <form onSubmit={handleSumbit}>
        <label>
          Amount:
          <input type="number" name="amount" ref={amountInputEleRef} />
        </label>
        <label>
          From:
          <select name="from">
            {options}
          </select>
        </label>
        <label>
          To:
          <select name="to">
            {options}
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div role="alert">{result}</div>
    </>
  );
}

export default App;
