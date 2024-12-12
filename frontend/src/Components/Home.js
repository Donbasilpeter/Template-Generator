import React from 'react';
import TaskBar from './Taskbar.js';
import LeftRight from './LeftRight.js';


const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <TaskBar/>
      <LeftRight/>
    </div>
  );
};

export default Home;
