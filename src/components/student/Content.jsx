import React ,{useState} from 'react';
import {Table,Button,Upload,Modal,message,notification} from 'antd';
import { UploadOutlined,DownloadOutlined,PaperClipOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


const baseHost = 'http://www.goven-zone.xyz:80';
const uploadHost = baseHost + '/student/upload';
const downloadHost = baseHost + '/student/download';

const work_status = {
  '0' : '待批改',
  '1' : '需完善',
  '2' : '已完成'
};



function StudentContent(props){

  const {
    token,
    studentAssignments
  } = props;

  const [workReview,setWorkReview] = useState({});//查询老师批改信息窗口数据

  const changeUpload = (info) => {
    if (info.file.status === 'done' && info.file.response.data) {
      //message全局提示（ant design）
      message.info('上传成功');
    }else if(info.file.status === 'error'){
      //notification通知提醒框(ant design)
      notification.error({
        message:'上传失败',
        description: info.file.response.errorMessage
      });
    }
  };

  const handleReviewDetail = (record) => {
    if(!!record){
      setWorkReview(record);
    }else{
      setWorkReview({});
    }
  };

  const columns = [
    {
      title: '课程',
      dataIndex: 'org_name'
    },
    {
      title: '作业名称',
      dataIndex: 'name'
    },
    {
      title: '开始-截至的时间',
      render(text,record){
        return (
          <span>{`${record.start_time}~${record.end_time}`}</span>
        );
      }
    },
    {
      title:'操作',
      render(text,record){
        return (
          <>
            <Upload
              action={uploadHost}
              headers={{Token:token}}
              data={{id: record.assignment_id}}
              showUploadList = {false}
              onChange={changeUpload} 
            >
              <Button><UploadOutlined />上传</Button>
            </Upload>
            {
              !!record.work
                ?<Button><a href={`${downloadHost}?id=${record.work.id}&type=student`}><DownloadOutlined />下载</a></Button>
                :null
            }
          </>
        );
      }
    },
    {
      title:'状态',
      render(text,record){
        return (
          <span>{!!record.work? work_status[record.work.status] : '未提交' }</span>
        );
      }
    },
    {
      title:'信息',
      render(text,record){
        return (
          <div>
            {
              !!record.work
                ?<>
                  {
                    record.work.status===0
                      ?<div>
                        {record.work.teacher_download_time ? `${record.work.teacher_download_time} 老师已下载` : `${record.work.commit_time} 提交` }
                      </div>
                      :<div>
                        <p>{`${record.work.review_time} ${record.work.status==1?'老师提交修改意见':'老师完成批改'}`}</p>
                        <Button onClick={()=>handleReviewDetail(record.work)}>查看详情</Button>
                      </div>
                  }
                </>
                :<div ></div>
            }
          </div>
        );
      }
    }
  ];


  return (
    <>
      <Table columns={columns} dataSource={studentAssignments} rowKey={record=>record.assignment_id} pagination={false}></Table>
      <Modal 
        visible={Object.keys(workReview).length!=0}
        title="批改意见" 
        cancelButtonProps={{ disabled: true }}
        destroyOnClose={true}
        onCancel={()=>handleReviewDetail()}
        footer={[<Button type='primary' onClick={()=>handleReviewDetail()}>明白了</Button>]}
      >
        <p>{workReview.teacher_review}</p>
        <a href={`${downloadHost}?id=${workReview.id}&type=teacher`} target="_blank">
          <Button><PaperClipOutlined/>附件</Button>
        </a>
      </Modal>
    </>
  );
};



const mapStateToProps = ({AuthorizationReducer,StudentReducer}) => {
  return {
    ...StudentReducer,
    token:AuthorizationReducer.info.token
  };
};


export default connect(mapStateToProps)(StudentContent);

StudentContent.propTypes = {
  token:propTypes.string,
  studentOrgs:propTypes.array,
  stats:propTypes.object,
  studentAssignments:propTypes.array,
  workReview:propTypes.object,
};

StudentContent.defaultProps = {
  token:'',
  studentOrgs:[],
  stats:{},
  studentAssignments:[],
  workReview:{},
};