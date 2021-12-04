import React from 'react';
import { Button} from 'antd';
import { HomeOutlined, LogoutOutlined } from '@ant-design/icons';
import {logout} from '@/actions/authorization';
import {connect} from 'react-redux';
import porpTypes from 'prop-types';

function HeaderCommon({logout}) {
  return (
    <>
      <Button  className="vcenter">
        <a href="https://github.com/Goven-space" target="_blank">
          <HomeOutlined />
          代码仓库
        </a>
      </Button>
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

HeaderCommon.propTypes = {
  logout:porpTypes.func
};

HeaderCommon.defaultProps = {
  logout:()=> null,
};
