import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [nameInput, setNameInput] = useState("");
  const [result, setResult] = useState();
  const [pictureResult, setPictureResult] = useState();
  const [nameInputPicture, setNameInputPicture] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    // const response = await fetch("/api/generate", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ animal: nameInput }),
    // });
    // const data = await response.json();

    const nameResponse = await fetch("/api/name", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: nameInput  }),
    });
    const nameData = await nameResponse.json();

    setResult(nameData.result);
    // setPictureResult(data);
    // console.log(pictureResult);
    setNameInput("");
    console.log(nameInputPicture);
  }

  async function onPictureGenerate() {
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: `${result} ${nameInputPicture} RPG Character` }),
    });
    const data = await response.json();
    setPictureResult(data.result.map(picture => {
      return <img key={picture.url} src={picture.url} alt= "character picture" />
    }))
    
    // setPictureResult(data);
  }

  // useEffect(() => {
  //   onPictureGenerate();
  // }, [result])
  

  return (
    <div>
      <Head>
        <title>RPG Name Generator</title>
        <link rel="icon" href="/character.png" />
      </Head>

      <main className={styles.main}>
        <img src="/character.png" className={styles.icon} />
        <h3>Your character's class</h3>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter a class e.g., wizard, ninja"
            value={nameInput}
            onChange={(e) => {
                setNameInput(e.target.value)
                setNameInputPicture(e.target.value)
            }}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
        
        <div>
            <button onClick={onPictureGenerate}>Generate Images</button>
            <div>
              {pictureResult}
            </div>
        </div>
      
      </main>
    </div>
  );
}
