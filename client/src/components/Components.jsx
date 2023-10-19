import React, { useEffect } from "react";

// Text Typing Components
export function TextTyping() {
  useEffect(() => {
    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // const phrases = ["code", "make beats", "hug puppies"];
    const phrases = ["Medicine Supply Chain Management"];
    const el = document.getElementById("typewriter");
    let sleepTime = 100;
    let curPhraseIndex = 0;
    const writeLoop = async () => {
      while (true) {
        let curWord = phrases[curPhraseIndex];
        for (let i = 0; i < curWord.length; i++) {
          el.innerText = curWord.substring(0, i + 1);
          await sleep(sleepTime);
        }
        await sleep(sleepTime * 10);
        for (let i = curWord.length; i > 0; i--) {
          el.innerText = curWord.substring(0, i - 1);
          await sleep(sleepTime);
        }
        await sleep(sleepTime * 5);
        if (curPhraseIndex === phrases.length - 1) {
          curPhraseIndex = 0;
        } else {
          curPhraseIndex++;
        }
      }
    };
    writeLoop();
  }, []);
  return (
    <div style={{ fontSize: "16px", padding: "0.5rem", textAlign: "center" }}>
      <h1>
        Hey, Welcome👋 to <span id="typewriter"></span>
        <span id="cursor">|</span>
      </h1>
    </div>
  );
}

// export function Component2(props) {
//   return <button onClick={props.onClick}>Click me</button>;
// }

// export function Component3(props) {
//   return <img src={props.src} alt={props.alt} />;
// }

// ...more components
