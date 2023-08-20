import React, { useState } from "react";
import { downloadInstagramVideo } from "./assets/api";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoData, setVideoData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (videoUrl) {
      setIsLoading(true);
      try {
        const data = await downloadInstagramVideo(videoUrl);
        setVideoData(data);
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <video className="background-video" loop muted autoPlay>
        <source src="https://res.cloudinary.com/deafnuhyi/video/upload/v1691920847/Untitled_cjlqzp.mov" type="video/mp4" />
      </video>

      <div className="content">
        <h1 className="heading">Instagram Reel Video Downloader</h1>
        <input type="text" className="input" placeholder="Reel Url" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        {isLoading ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          videoData && (
            <div className="video-section">
              <video className="video-player" controls>
                <source src={videoData.media} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )
        )}
        <p className="P">KLIK PADA TOMBOL TITIK TIGA LALU CLICK DOWNLOAD</p>
        <button className="button" onClick={handleDownload}>
          <span>Download</span>
        </button>
        <span className="font-bold text-white mt-4">My Contact</span>
        <div className="flex justify-center items-center mt-4">
          <a className="" href="https://www.instagram.com/ahmdfrizza/?hl=en">
            <img className="w-12 h-12 text-gray-500" src="/img/instagram.png" alt="" />
          </a>
          <a className="ml-8" href="https://www.linkedin.com/in/ahmad-afriza-ez4-ab9173276/">
            <img className="w-12 h-12 text-gray-500" src="/img/linkedin.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
