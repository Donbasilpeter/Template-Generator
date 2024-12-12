

import React from 'react';
import { Box } from '@mui/material';
import ChatAndCode from './ChatAndCode.js';
import SessionList from './SessionList.js';


const LeftRight = () => {
  return (
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
  );
};

export default LeftRight;
