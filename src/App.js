import { useState } from 'react';
import './App.css';
import cad from './cad.json';

const allCurrencies = Object.values(cad);
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

  const [description, setDescription] = useState(null);
  const [result, setResult] = useState(null);

  function handleSumbit(event) {
    event.preventDefault();
    let { amount, from, to } = event.target;
    amount = Number(amount.value);
    from = JSON.parse(from.value);
    to = JSON.parse(to.value);
    const result = to.rate / from.rate * amount;
    setDescription(`${amount} ${from.code} = `);
    setResult(`${result} ${to.code}`);
  }

  return (
    <>
      <form onSubmit={handleSumbit}>
        <label>
          Amount:
          <input type="number" name="amount" />
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
      <div>{description}</div>
      <div>{result}</div>
    </>
  );
}

export default App;
