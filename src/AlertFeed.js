import React, { useState, useEffect } from "react";

const AlertFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.stuff.co.nz%2Frss"
      ).then((response) => response.json());
      setNews(result.items);
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {news.map((item) => (
          <li key={item.guid}>
            {String(item.pubDate).split(" ")[0]}:{" "}
            <a href={item.link}>{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertFeed;
