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

  return (
    <div className="instagram-downloader-container">
      <label htmlFor="instagramUrl">Instagram URL:</label>
      <input
        type="text"
        id="instagramUrl"
        placeholder="https://www.instagram.com/p/CzJ4dY9vnZw/?utm_source=ig_web_copy_link"
        value={inputValue}
        onChange={handleInputChange}
      />

      <button onClick={() => fetchData(inputValue)}>Generate</button>

      {loading && <p>Loading...</p>}

      <div className="result-container">
        {result.map((url, index) => (
          <div key={index} className="result-item">
            <p>Hasil: </p>
            <p>{index}:</p>
            <a href={url} target="_blank" rel="noopener noreferrer">
              <button
                className="download-button"
                onClick={() => (window.location.href = url)}
                download
              >
                Download
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InstagramDownloader;
