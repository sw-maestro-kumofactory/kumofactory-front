'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TestPage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchFn = async () => {
      const d = await axios.get('/local/test');
      setData(d.data);
    };
    fetchFn();
  }, []);
  return <div>{data}</div>;
};

export default TestPage;
