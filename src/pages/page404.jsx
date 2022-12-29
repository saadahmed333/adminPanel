import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom'
const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Link to={"/"}><Button type="primary">Back Home</Button></Link>}
  />
);
export default Page404;