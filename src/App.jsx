import React, { useState } from "react";
import axios from "axios";

const InstagramDownloader = () => {
  const [result, setResult] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async (url) => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
      params: {
        url: url,
      },
      headers: {
        "X-RapidAPI-Key": "7cb05360f8mshca6918f8ea33103p1c4264jsn97b178de78f8",
        "X-RapidAPI-Host":
          "instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setResult(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);
  };

  const handleDownload = () => {
    // Clear previous results when a new URL is entered
    setResult([]);
    fetchData(inputValue);
  };

  return (
    <div className="instagram-downloader-container">
      <h2>Instagram Downloader</h2>
      <p>Masukan URL Instagram di bawah:</p>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter Instagram URL"
        className="instagram-input"
      />
      <button onClick={handleDownload} className="instagram-button">
        Generate
      </button>

      <p>Support Me:</p>
      <div class="social-icons">
        <a
          href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/"
          target="_blank"
        >
          <img className="icon" src="linkedin.png" alt="LinkedIn Icon" />
        </a>
        <a href="https://www.instagram.com/ahmdafriz4/" target="_blank">
          <img className="icon" src="instagram.png" alt="Instagram Icon" />
        </a>
      </div>

      {loading && <p>Loading...</p>}

      {result.map((item, index) => (
        <div key={index} className="result-item">
          <p className="result-title">{item.title}</p>
          {item.type === "video" && (
            <video controls width="250" height="150">
              <source src={item.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          {item.type !== "video" && (
            <img src={item.thumb} alt={item.title} className="result-image" />
          )}
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="download-link"
          >
            <button className="download-button">Download Item</button>
          </a>
        </div>
      ))}
    </div>
  );
};

export default InstagramDownloader;
