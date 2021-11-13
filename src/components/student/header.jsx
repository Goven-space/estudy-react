import React from 'react';
import '@/styles/component/student/header.scss'

export default function studentHeader(){
    return (
        // <div class="flexrow" v-else>
        //   <h3 class="flexcol">
        //     <span>{{info.full_name}}</span>
        //     <span>学号:{{info.name}}</span>
        //   </h3>
        //   <h4 class="flexcol">
        //     <span v-for="(org,value) in studentOrgs" :key="`${org}_${value}`">{{org}}</span>
        //   </h4>
        //   <div>
        //     <span class="label">{{stats.uncommitted}}个作业待提交</span>
        //     <span class="label">{{stats.revising}}个作业待批改</span>
        //     <span class="label">{{stats.improvable}}个作业需完善</span>
        //     <span class="label">{{stats.finished}}个作业已完成</span>
        //   </div>
        <div>
            <h3 className="flexcol">
                <span>陈博</span>
            </h3>
        </div>
    )
}