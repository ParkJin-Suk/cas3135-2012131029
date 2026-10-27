import React, { useState } from 'react';

function App() {
  const [x, setX] = useState('');
  const [y, setY] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculate = async () => {
    setResult(null);
    setError(null);

    try {
      const response = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ x: x, y: y }),
      });

      const data = await response.json();

      if (data.type === 'error') {
        setError(data.message);
      } else if (data.type === 'success') {
        setResult(`Sum: ${data.sum}, Prod: ${data.prod}`);
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2>Calculator App</h2>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Input X" value={x} onChange={(e) => setX(e.target.value)} />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <input type="text" placeholder="Input Y" value={y} onChange={(e) => setY(e.target.value)} />
      </div>
      <button onClick={handleCalculate}>Calculate</button>

      <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {result && <div style={{ color: 'green' }}>{result}</div>}
      </div>
    </div>
  );
}

export default App;