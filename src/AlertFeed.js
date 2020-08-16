import React, { useState, useEffect, useRef } from "react";

function Sentiment({sentiment}) {
  const color = {
    POSITIVE: "green",
    NEGATIVE: "red",
    NEUTRAL: "grey",
    MIXED: "yellow",
  }
  return (
    <span className={`sentiment sentiment--${color[sentiment]}`}></span>
  )
}
const AlertFeed = () => {
  const [news, setNews] = useState([]);
  const sentimentsRef = useRef({})
  const [, setNonce] = useState(0)

  async function fetchSentiment(text) {
    const res = await fetch('https://nxy8n67x9k.execute-api.ap-southeast-2.amazonaws.com/prod', {
      method: 'POST', body: JSON.stringify({
        text,
      })
    })
    const data = await res.json()
    const sentiment = data.body.Sentiment
    sentimentsRef.current[text] = sentiment
    setNonce(Date.now())
  }

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.stuff.co.nz%2Frss"
      ).then((response) => response.json());
      setNews(result.items);

      const promises = result.items.map(item => fetchSentiment(item.title))
      await Promise.all(promises)
    };

    fetchData();
  }, []);

  return (
    <div>
      <ul>
        {news.map((item) => (
          <li key={item.guid}>
            {String(item.pubDate).split(" ")[0]}:{" "}
            <Sentiment sentiment={sentimentsRef.current[item.title]}/>
            <a href={item.link} rel="noopener noreferrer" target="_blank">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AlertFeed;
