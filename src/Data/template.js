import React from "react";

function Template() {
  const iframeStyle = {
    width: "100%",
    height: "100%",
    border: "none",
    overflow: "hidden",
  };

  const containerStyle = {
    width: "100%",
    height: "100%",
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <iframe
        src="http://localhost:3001" // URL of the child React app
        title="Child React App"
        style={iframeStyle}
      />
    </div>
  );
}

export default Template;
