import React, { Component } from 'react'
import { Table, Space } from 'antd';
import { Popconfirm, message } from 'antd';
import {Link} from 'react-router-dom'
import axios from 'axios'



var data = [

];
var cid;
var ctime;
export default class MyClass extends Component {

    constructor() {
        super()
        this.state = {
            username: "",
            psw: "",
            course_ID: "",
            type: ""
        }
    }
    componentWillMount() {
        var id = this.props.location.state.username;
        var passw = this.props.location.state.psw;
        var tp = this.props.location.state.type;
        this.setState({
            username: id,
            psw: passw,
            course_ID: '',
            type: tp
        });
        const _this = this;
        const params = {
            key: id,
            type: 'teacher_ID'
        }

        console.log(params);
        axios.get('http://127.0.0.1:8000/api/show/',
            { params },
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        ).then(function (response) {
            _this.setState({
                isLoaded: true
            });
            var datalist = [];
            datalist = response.data.data;

            data.length = 0;
            let temp = [...data];
            //let temp=[];
            for (const i in datalist) {
                temp.push({
                    key: i,
                    id: datalist[i].ID,
                    name: datalist[i].name,
                    credit: datalist[i].credit,
                    description: datalist[i].description,
                    teacher_ID: datalist[i].teacher_ID,
                    stock: datalist[i].stock,
                    time: datalist[i].time
                })
            }

            _this.setState({
                courses: temp,
                curSelectClass: temp,
            })
            console.log(_this.state.curSelectClass);
        })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    isLoaded: false,
                    error: error
                })
            })

    }

    getCID(record) {
        cid = record.id;
        ctime = record.time;
        this.state.course_ID = cid;

        this.props.history.push({ pathname: '/TeacherCenter/EditLesson', state: { username: this.state.username, psw: this.state.psw, course_ID: cid, time: ctime } });
    }

    requestDeleteSend(record) {
        const _this = this;

        /*var curSelectClass=this.state.curSelectClass;
        this.setState({
            curSelectClass:{...curSelectClass,name:record.name}
        })
        console.log(record);*/
        _this.setState(preState => ({
            ...preState.curSelectClass,
            name: record.name,
            id: record.id,
            key: record.key,
            credit: record.credit,
            description: record.description,

        }));
        console.log(_this.state.curSelectClass);
        var params = {
            key: record.id
        }
        console.log(record);
        axios
            .get('http://127.0.0.1:8000/api/delete/',
                { params },
                {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                }).then(function (response) {
                    message.success('????????????');
                    axios
                        .post('http://127.0.0.1:8000/api/systemlog',
                            transformFormData({
                                ID: record.id,
                                message: "??????????????????",
                            }),
                            {
                                headers: { 'content-type': 'application/x-www-form-urlencoded' }
                            }
                        ).then((response) => {
                            // get response
                            console.log(response);
                        })
                })
            .catch(function (error) {
                message.error('????????????');
            })
        var id = this.state.username;
        params = {
            key: id,
            type: 'teacher_ID'

        }
        axios.get('http://127.0.0.1:8000/api/show/',
            { params },
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                _this.setState({
                    isLoaded: true
                });
                var datalist = [];
                datalist = response.data.data;

                data.length = 0;
                let temp = [...data];
                //let temp=[];
                for (const i in datalist) {
                    temp.push({
                        key: i,
                        id: datalist[i].ID,
                        name: datalist[i].name,
                        credit: datalist[i].credit,
                        description: datalist[i].description,
                        teacher_ID: datalist[i].teacher_ID,
                        stock: datalist[i].stock
                    })
                }

                _this.setState({
                    courses: temp,
                    curSelectClass: temp,
                    shabi: 3
                })
                console.log(_this.state.curSelectClass);
            })
            .catch(function (error) {
                console.log(error);
                _this.setState({
                    isLoaded: false,
                    error: error
                })
            })
    }




    render() {
        const columns = [
            {
                title: '????????????',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '??????',
                dataIndex: 'name',
                key: 'name',
            },
            {
                title: '??????',
                dataIndex: 'credit',
                key: 'credit',
            },
            {
                title: '??????',
                dataIndex: 'description',
                key: 'description'
            },
            {
                title: '????????????',
                dataIndex: 'teacher_ID',
                key: 'teacher_ID'
            },
            {
                title: '??????',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Popconfirm
                            title="??????????????????????????????"
                            onConfirm={this.getCID.bind(this, record)}
                            onCancel={cancel}
                            okText="???"
                            cancelText="???">
                            <a>
                                ????????????
                                </a>
                        </Popconfirm>

                        <Link to={{ pathname: '/TeacherCenter/CourseResource', state: { username: this.state.username, psw: this.state.psw } }}>
                            <a>????????????</a>
                        </Link>
                        <Link to={{ pathname: '/TeacherCenter/AddHW', state: { username: this.state.username, psw: this.state.psw } }}>
                            <a>????????????</a>
                        </Link>
                        <Link to={{ pathname: '/TeacherCenter/HWMarking', state: { username: this.state.username, psw: this.state.psw } }}>
                            <a>????????????</a>
                        </Link>
                        <Link to={{ pathname: '/TeacherCenter/Quiz', state: { username: this.state.username, psw: this.state.psw } }}>
                            <a>????????????</a>
                        </Link>
                        <Popconfirm
                            title="??????????????????????????????"
                            onConfirm={this.requestDeleteSend.bind(this, record)}
                            onCancel={cancel}
                            okText="???"
                            cancelText="???">
                            <a>????????????</a>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        if (!this.state.isLoaded) {
            return <div>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                Loading
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
            </div>
        }
        else {
            return (
                <div>
                    <Table columns={columns} dataSource={this.state.courses} />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                </div>
            )
        }
    }
}




function cancel(e) {
    console.log(e);
    message.error('????????????');
}

const transformFormData = (obj) => {
    let formData = new FormData()
  
    for (let k in obj) {
      formData.append(k, obj[k])
    }
  
    return formData
  }