import React from 'react';
import Template from './template.js';
import ChatBox from './Chatbox.js';

const ScreenDivider = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 8,overflow:"auto"}}>
        <Template />
      </div>
      <div style={{ flex: 2 }}>
        <ChatBox />
      </div>
    </div>
  );
};

export default ScreenDivider;
