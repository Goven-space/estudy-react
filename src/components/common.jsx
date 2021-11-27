import React from 'react';
import { Button} from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import {logout} from '@/actions/authorization';
import {connect} from 'react-redux';

function HeaderCommon({logout}) {
  return (
    <>
      <a className="vcenter" href="https://github.com/Goven-space" target="_blank">
        <Button>
          <HomeOutlined />
          代码仓库
        </Button>
      </a>
      <Button className="vcenter" onClick={logout}>
        <LogoutOutlined />
        退出
      </Button>
    </>
  );
};

const mapDispatchToPorps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null,mapDispatchToPorps)(HeaderCommon);
