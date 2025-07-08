import { useState } from "react";
import axios from "axios";
import ShortenedLink from "./ShortenedLink";

function ShortenerForm() {
  const [url, setUrl] = useState("");
  const [shortLinks, setShortLinks] = useState([]);
  const [error, setError] = useState("");

  const handleShorten = async () => {
   
    if (shortLinks.length >= 5) {
      setError("You can only shorten up to 5 URLs.");
      return;
    }

   
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(url)) {
      setError("Please enter a valid URL (must include http/https).");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/shorten", { url });
      setShortLinks([...shortLinks, res.data]);
      setUrl("");
      setError("");
    } catch (err) {
      setError("Failed to shorten URL.");
      console.error(err);
    }
  };

  return (
    <div className="text-center p-4">
      <input
        className="p-2 rounded w-80 text-black bg-white"
        placeholder="Enter URL to shorten"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 ml-2 rounded"
        onClick={handleShorten}
      >
        Shorten
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <div className="mt-6">
        {shortLinks.map((linkObj, idx) => (
          <ShortenedLink key={idx} original={linkObj.original} short={linkObj.short} />
        ))}
      </div>
    </div>
  );
}

export default ShortenerForm;
