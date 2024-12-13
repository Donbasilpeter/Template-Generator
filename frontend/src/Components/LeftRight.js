

import React from 'react';
import { Box } from '@mui/material';
import ChatAndCode from './ChatAndCode.js';
import SessionList from './SessionList.js';
import TaskBar from './Taskbar.js';



const LeftRight = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh'}}>
    <TaskBar/>
    <Box
display="flex"
width="100%"
height="100%"
sx={{
  flexGrow: 1,
  overflow:"auto"
}}
>
<Box
  flex={1}
  display="flex"
  justifyContent="center"
  alignItems="center"

>
<SessionList/>
</Box>
<Box
  flex={3}
  display="flex"
  justifyContent="center"
  alignItems="center"

>
<ChatAndCode/>
</Box>
</Box>
  </div>

  );
};

export default LeftRight;
