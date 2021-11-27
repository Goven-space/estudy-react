import React from 'react';
import {connect} from 'react-redux';

function StudentHeader(){
  return  (       
    <div>
      <h3 className="flexcol">
        <span>陈博</span>
        
      </h3>
    </div>
  );
};


const mapStateToProps = (state) => {
  return {
    full_name : state.AuthorizationReducer.info.full_name,
  };
};


export default connect(mapStateToProps)(StudentHeader);

