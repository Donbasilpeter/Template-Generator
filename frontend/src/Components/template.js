import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import JsxParser from 'react-jsx-parser';


function Template() {
  const template = useSelector((state) => state.template.code);


  return (
      <JsxParser height='100%' width='100%' jsx={template} />
  );
}

export default Template;
