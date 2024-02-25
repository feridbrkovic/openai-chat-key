import { useState } from "react";
import axios from "axios";
import "./App.scss";

const HTTP_ENDPOINT = "http://localhost:8080/chatbot";

async function sendPrompt({ key, prompt }) {
  try {
    const response = await axios.post(HTTP_ENDPOINT, { key, prompt });
    return response.data;
  } catch (error) {
    console.error("Failed to send prompt:", error);
    throw error;
  }
}

const OpenAIChatbot = () => {
  const [key, setKey] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!prompt.trim()) return;
    if (!key.trim()) {
      setError("Please enter your OpenAI API key.");
      return;
    }
    setError("");

    try {
      const resData = await sendPrompt({ key, prompt });
      setResponse(resData);
    } catch (error) {
      setError("Please check your API Key and try again.");
    }

    setPrompt(""); 
  };

  const handleKey = (event) => {
    setKey(event.target.value);
  };
  
  const handlePrompt = (event) => {
    setPrompt(event.target.value);
  };

  return (
    <div className="container">
      <h1 className="title">OpenAI Chatbot - API Key</h1>
      <form className="form" onSubmit={handleSubmit}>
      <label>OpenAI API Key</label>
      <div className="form-group">
            <input
              type="text"
              placeholder="Enter your OpenAI API key here ..."
              value={key}
              onChange={handleKey}
            />
          </div>
        <label>Ask a question</label>
        <div className="form-container">
          <div className="form-group">
            <input
              className="question-input"
              type="text"
              placeholder="Enter your question here ..."
              value={prompt}
              onChange={handlePrompt}
            />
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </div>
      </form>
      {error && <div className="error">{error}</div>}
      <div className="response">
        <p className="text-light">
          {response || "Submit your question in the text field above ..."}
        </p>
      </div>
    </div>
  );
}

export default OpenAIChatbot;