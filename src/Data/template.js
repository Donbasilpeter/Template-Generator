import React from "react";

function Template() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="http://localhost:3001" // URL of the child React app
        title="Child React App"
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default Template;
