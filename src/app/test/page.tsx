'use client';
import { useEffect, useState } from 'react';

import { getTemplateData } from '@/src/api/template';

const Test = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const d = getTemplateData();
    console.log(d);
  }, []);
  return <div>Hi</div>;
};

export default Test;
