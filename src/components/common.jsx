import React from 'react';
import { Button } from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';

export default function headerCommon() {
  return (
    <>
      <a className="vcenter" href="https://github.com/Goven-space" target="_blank">
        <Button>
          <HomeOutlined />
          代码仓库
        </Button>
      </a>
      <Button className="vcenter">
        <LogoutOutlined />
        退出
      </Button>
    </>
  );
}


