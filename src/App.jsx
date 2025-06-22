import { useState } from "react";
import iconDice from './images/icon-dice.svg';
import dividerDesktop from "./images/pattern-divider-desktop.svg";
import dividerMobile from "./images/pattern-divider-mobile.svg";

function App() {
  const [data, setData] = useState({
    id: "1",
    advice:
      "Remember that spiders are more afraid of you, than you are of them.",
  });

  const getNewQuote = async () => {
    const response = await fetch(`https://api.adviceslip.com/advice`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    const jsonQuoteData = await response.json();

    setData((prev) => ({
      ...prev,
      id: jsonQuoteData.slip.id,
      advice: jsonQuoteData.slip.advice,
    }));
  };

  return (
    <>
      <div className="wrapper">
        <header>
          <h1>Advice #{data.id}</h1>
        </header>
        <main>
          <article>
            <h2>&quot;{data.advice}&quot;</h2>
          </article>
          <div className="image-wrapper">
            <picture>
              <source
                srcSet={dividerDesktop}
                media="(min-width: 500px)"
              />
              <img
                src={dividerMobile}
                alt="pattern-divider"
              />
            </picture>
          </div>
        </main>
          <button aria-label="Generate new quote"  type="button" onClick={getNewQuote}>
            <img src={iconDice} alt="generate-quote" />
          </button>
      </div>
    </>
  );
}

export default App;
