import React from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';

function StudentHeader(props){

  const {
    full_name,
    name,
    studentOrgs,
    stats
  } = props;


  return  (       
    <div className="flexrow">
      <h3 className="flexcol">
        <span class="user_info">{full_name}</span>
        <span class="user_info">学号:{name}</span>
      </h3>
      <h4 className="flexcol">
        {
          studentOrgs.map((org,index) => {
            return <span class="user_info" key={`${org}_${index}`}>{org}</span>;
          })
        }
      </h4>
      <div className="user_info">
        <span className="label">{stats.uncommitted}个作业待提交</span>
        <span className="label">{stats.revising}个作业待批改</span>
        <span className="label">{stats.improvable}个作业需完善</span>
        <span className="label">{stats.finished}个作业已完成</span>
      </div>
    </div>
  );
};



const mapStateToProps = ({AuthorizationReducer,StudentReducer}) => {
  return {
    full_name:AuthorizationReducer.info.full_name,
    name:AuthorizationReducer.info.name,
    studentOrgs:StudentReducer.studentOrgs,
    stats:StudentReducer.stats
  };
};

export default connect(mapStateToProps)(StudentHeader);

StudentHeader.propTypes = {
  full_name:propTypes.string,
  name:propTypes.string,
  studentOrgs:propTypes.array,
  stats:propTypes.PropTypes.object,
};

StudentHeader.defaultProps = {
  full_name:'',
  name:'',
  studentOrgs:[],
  stats:{},
};