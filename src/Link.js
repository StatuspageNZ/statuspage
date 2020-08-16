import React from "react";
import { useHistory } from "react-router-dom";

const Link = ({ href, children }) => {
  let history = useHistory();
  return (
    <div
      className="link__link"
      onClick={() => { history.push(href); window.scrollTo(0, {}) }}
    >
      {children}
    </div>
  );
};

export default Link;
