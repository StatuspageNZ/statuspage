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
  const [police, setPolice] = useState([]);
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
    const fetchStuffData = async () => {
      const result = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.stuff.co.nz%2Frss"
      ).then((response) => response.json());
      setNews(result.items);

      const promises = result.items.map(item => fetchSentiment(item.title))
      await Promise.all(promises)
    };
    const fetchPoliceData = async () => {
      const result = await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.police.govt.nz%2Frss%2Falerts"
      ).then((response) => response.json());
      console.log(result.items);
      const items = result.items;
      var array = [];
      for (var i in items) {
        if (items[i]) {
          array.push(items[i].content)
        }
      }

      let data = [];
      result.items.forEach((element) => {
        data.push({
          title: element.title,
          guid: element.guid,
          link: element.link,
          pubDate: element.pubDate,
          content: element.content,
        });
      });

      function extractContent(s) {
        var span = document.createElement('span');
        span.innerHTML = s;
        return span.innerText;
      };

      for (i in data) {
        data[i].content = extractContent(data[i].content.toString()).replace(/([\s\n])+/g, " ").split("ENDS")[0].trim()
      };
      setPolice(data);
    };

    fetchStuffData();
    fetchPoliceData();
  }, []);

  return (
    <>
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
    <div>
      <ul>
        {police.map((item) => (
          <li key={item.guid}>
            {String(item.pubDate).split(" ")[0]}:{" "}
            <a href={item.link} rel="noopener noreferrer" target="_blank">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  </>
  );
};

export default AlertFeed;
