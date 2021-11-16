import React from 'react';
import { Button } from 'antd';
import {FileAddOutlined} from '@ant-design/icons';



export default function TeacherHeader() {
  return (
    <div v-if="isTeacher" class="flexrow">
      <h3>
        <span>luwei</span>
      </h3>
      <Button
        className="vcenter"
        type="primary"
      >
        <FileAddOutlined />
        新建作业
      </Button>
    </div >
  );
}
