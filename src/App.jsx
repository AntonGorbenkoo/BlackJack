import { useEffect, useState } from 'react';
import './App.css';
import { Blackjack } from 'easy-blackjack';

function App() {
  const [compCount, setCompCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [dealerCards, setDealerCards] = useState([]);
  const [playerCards, setPlayerCards] = useState([]);
  const [myGame, setMygame] = useState({});
  const [winner, setWinner] = useState('');
  const [hidden, setHidden] = useState('');
  console.log(myGame);
  console.log(hidden);

  const allCard = [
    '2C',
    '3C',
    '4C',
    '5C',
    '6C',
    '7C',
    '8C',
    '9C',
    '10C',
    'AC',
    'JC',
    'KC',
    'QC',
    '2S',
    '3S',
    '4S',
    '5S',
    '6S',
    '7S',
    '8S',
    '9S',
    '10S',
    'AS',
    'JS',
    'KS',
    'QS',
    '2D',
    '3D',
    '4D',
    '5D',
    '6D',
    '7D',
    '8D',
    '9D',
    '10D',
    'AD',
    'JD',
    'KD',
    'QD',
    '2H',
    '3H',
    '4H',
    '5H',
    '6H',
    '7H',
    '8H',
    '9H',
    '10H',
    'AH',
    'JH',
    'KH',
    'QH',
  ];

  useEffect(() => {
    const game = new Blackjack();
    setMygame(game);
    console.log(game);
  }, []);

  const handleRestart = () => {
    // const game = new Blackjack();
    // setMygame(game);
    document.location.reload();
  };

  const handleStartGame = () => {
    setCompCount(myGame.dealerSum);
    setUserCount(myGame.playerSum);
    console.log(myGame);

    function dealerCard() {
      let arr = myGame.dealerDeck.map((el, i) => {
        return el.value + el.type;
      });
      console.log(arr);
      return arr;
    }
    function userCard() {
      let arr = myGame.playerDeck.map((el) => {
        return el.value + el.type;
      });
      console.log(arr);
      return arr;
    }
    function dealerInter() {
      const arr = dealerCard();
      const intersect = allCard.filter((item) => {
        return arr.includes(item);
      });
      console.log(intersect);
      return intersect;
    }
    function playerInner() {
      const arr = userCard();
      const intersect = allCard.filter((item) => {
        return arr.includes(item);
      });
      return intersect;
    }
    setDealerCards(dealerInter());
    setPlayerCards(playerInner());

    function hiddenCard() {
      let hCard = [myGame.hidden.value + myGame.hidden.type];
      setHidden(hCard);
      return hCard;
    }
    hiddenCard();
  };

  const handleHit = () => {
    // hitF();
    myGame.hit();
    console.log(myGame);
    setUserCount(myGame.playerSum);
    function userCard() {
      let arr = myGame.playerDeck.map((el) => {
        return el.value + el.type;
      });
      return arr;
    }
    function playerInner() {
      const arr = userCard();
      const intersect = allCard.filter((item) => {
        return arr.includes(item);
      });
      return intersect;
    }
    setPlayerCards(playerInner());
  };

  const handleStop = () => {
    myGame.stay();
    console.log(myGame);
    console.log(myGame.result);
    setWinner(myGame.result);
  };
  return (
    <div className="App">
      <div className="playGround">
        <div className="hitOrStand">
          {winner !== '' ? winner : 'Hit or Stay'}
        </div>
      </div>
      <div className="playGroundBtn">
        <button type="button" onClick={handleStartGame}>
          Play
        </button>
        <button type="button" onClick={handleHit}>
          Hit
        </button>
        <button type="button" onClick={handleStop}>
          Stay
        </button>
        <button type="button" onClick={handleRestart}>
          Restart
        </button>
      </div>
      <div>{!compCount ? null : `Dealers hand (${compCount})`}</div>
      <div className="dCards">
        {dealerCards.length
          ? dealerCards.map((el, index) => (
              <div className="card">
                <img src={`/cardsss/${el}.svg`} className="cardImg" />
              </div>
            ))
          : null}
      </div>
      <div>{!userCount ? null : `Players hand (${userCount})`}</div>
      <div className="pCards">
        {playerCards.length
          ? playerCards.map((el) => (
              <div className="card">
                <img src={`/cardsss/${el}.svg`} className="cardImg" />
              </div>
            ))
          : null}
      </div>
    </div>
  );
}

export default App;
