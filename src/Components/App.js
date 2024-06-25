import React from 'react';
import Template from '../Data/template.js';
import ChatBox from './Chatbox.js';
import WelcomeTemplate from './welcome.js';
import { useSelector } from 'react-redux';
import Loading from './loading.js';


const ScreenDivider = () => {
  const template = useSelector((state) => state.template.code);
  const isLoading = useSelector((state) => state.template.isLoading);


  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor:"#F3F3F4"}}>
      <div style={{ flex: 8,overflow:"auto"}}>
        {
          isLoading?<Loading/> : (template ? <Template />:<WelcomeTemplate/>)
        }
        </div>
      <div style={{ flex: 2 }}>
        <ChatBox />
      </div>
    </div>
  );
};

export default ScreenDivider;
