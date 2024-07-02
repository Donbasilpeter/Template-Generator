import React, { useState, useEffect } from "react";

function Template() {
  const [isAppAvailable, setIsAppAvailable] = useState(false);

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

  useEffect(() => {
    const checkAppAvailability = async () => {
      try {
        const response = await fetch("http://localhost:3001");
        if (response.ok) {
          setIsAppAvailable(true);
        } else {
          setIsAppAvailable(false);
        }
      } catch (error) {
        setIsAppAvailable(false);
      }
    };

    checkAppAvailability();
  }, []);

  return (
    <div style={containerStyle}>
      {isAppAvailable ? (
        <iframe
          src="http://localhost:3001"
          title="Child React App"
          style={iframeStyle}
        />
      ) : (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <p>The demo app is not running...</p>
        </div>
      )}
    </div>
  );
}

export default Template;
