import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const PROD =
  "https://cors-anywhere.herokuapp.com/http://ec2-34-227-13-253.compute-1.amazonaws.com:8080";

function GreetingForm({ createGreeting }) {
  const [name, setName] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${PROD}/greeting${name ? `/?name=${name}` : ""}`
      );
      console.log(response.data);
      createGreeting(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          className="greeting-form__input"
          value={name}
          placeholder="Enter your name"
          onChange={e => setName(e.target.value)}
        />
        <input type="submit" className="greeting-form__submit" value="Submit" />
      </form>
    </div>
  );
}

function Greeting({ greeting }) {
  return (
    <div>
      <div className="greeting-block">
        <h1 className="greeting-block__title">ID</h1>
        <p className="greeting-block__content">{greeting.id}</p>
      </div>
      <div className="greeting-block">
        <h1 className="greeting-block__title">Greeting</h1>
        <p className="greeting-block__content">{greeting.content}</p>
      </div>
      <div className="greeting-block">
        <h1 className="greeting-block__title">JSON</h1>
        <p className="greeting-block__content">{JSON.stringify(greeting)}</p>
      </div>
    </div>
  );
}

function App() {
  const [greeting, setGreeting] = useState("");

  const createGreeting = createdGreeting => {
    setGreeting(createdGreeting);
  };

  return (
    <div className="App">
      <div className="heading">
        <div className="heading-text-box">
          <h1 className="heading-text-box__title">Greetings!</h1>
          <div className="greeting-form">
            <GreetingForm createGreeting={createGreeting} />
          </div>
        </div>
      </div>
      <div className="greeting">
        <div className="greeting__text">
          {greeting && <Greeting greeting={greeting} />}
        </div>
      </div>
    </div>
  );
}

export default App;
