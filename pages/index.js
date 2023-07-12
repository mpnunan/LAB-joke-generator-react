import { useState } from 'react';
import getJoke from '../api/jokeData';

function Home() {
  const [btn, setBtn] = useState('Get a joke');
  const [joke, setJoke] = useState('');
  const [delivery, setDelivery] = useState('');

  const sortJoke = (data) => {
    const part1 = data.setup;
    const part2 = data.delivery;
    return [part1, part2];
  };

  const handleClick = () => {
    if (btn === 'Get a joke' || btn === 'Get another joke') {
      setBtn('Get the punchline');
      document.getElementById('punch-line').hidden = true;
      getJoke()
        .then(sortJoke)
        .then((arr) => {
          setJoke(arr[0]);
          setDelivery(arr[1]);
        });
    } else if (btn === 'Get the punchline') {
      document.getElementById('punch-line').hidden = false;
      setBtn('Get another joke');
    }
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>{joke}</h1>
      <h4 id="punch-line" hidden>{delivery}</h4>
      <button type="button" onClick={handleClick}>{btn}</button>
    </div>
  );
}

export default Home;
