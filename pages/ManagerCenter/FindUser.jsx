import { Input, Button, Form } from 'antd';
import React from 'react';
import { Select, Table, message } from 'antd';
import axios from 'axios';
import qs from 'qs';
const { Option } = Select;


export default class ChangeUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            psw: "",
            type: '1',
            id: "",
            class: "",
            college: "",
            department: "",
            major: "",
            gender: "",
            id_card: "",
            contact: "",
            status: "",
            found: false,
            tp:""
        };
        this.sendRequest = this.sendRequest.bind(this);
        this.changeType = this.changeType.bind(this);
        this.changeState = this.changeState.bind(this);
    }

    componentWillMount() {
        var name = this.props.location.state.username;
        var passw = this.props.location.state.psw;
        var tp = this.props.location.state.type;
        console.log(name);
        this.setState({
            username: name,
            psw: passw,
            tp: tp
        })
    }

    sendRequest() {
        const _this = this;
        axios
            .post('http://127.0.0.1:8000/api/find',
                qs.stringify({
                    id: _this.state.id,
                    type: _this.state.type
                }),
                {
                    headers: { 'content-type': 'application/x-www-form-urlencoded' }
                }
            ).then((response) => {

                if (qs.stringify(response.data)) {
                    _this.setState({
                        id: response.data.ID,
                        name: response.data.name,
                        gender: response.data.sex,
                        contact: response.data.contact,
                        id_card: response.data.IDCardNum,
                        found: true
                    })
                    if (_this.state.type == '1') {
                        _this.setState({
                            college: response.data.school,
                            major: response.data.major,
                            class: response.data.class,
                            status: response.data.state
                        })
                    }
                    else {
                        _this.setState({
                            department: response.data.department,
                        })
                    }
                    message.info(`???????????? ${this.state.id}???`);
                }
                else {
                    message.info(`?????????????????????`);
                    _this.setState({
                        username: "",
                        psw: "",
                        class: "",
                        college: "",
                        department: "",
                        major: "",
                        gender: "",
                        id_card: "",
                        contact: "",
                        status: "",
                        found: false
                    });
                }
                console.log(_this.state);
                console.log(response.data);
            }).catch((error) => {
                message.error(`?????????????????????????????????`);
                _this.setState({
                    username: "",
                    psw: "",
                    class: "",
                    college: "",
                    department: "",
                    major: "",
                    gender: "",
                    id_card: "",
                    contact: "",
                    status: "",
                    found: false
                });
            })
    }

    changeType(value) {
        this.setState({
            type: value,
            found: false
        });
        console.log(`selected ${value}`);
    }

    changeState(event) {
        this.setState({ id: event.target.value });
        console.log(this.state.id);
    }

    render() {
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4, offset: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
        };
        const columns = [
            {
                title: '??????',
                dataIndex: 'key',
                key: 'key'
            },
            {
                title: '??????',
                dataIndex: 'val',
                key: 'val'
            }
        ];
        console.log(this.state.username);
        if (!this.state.found) {
            return (
                <>
                    <br /><br /><br /><br /><br />
                    <Form.Item label="????????????" {...formItemLayout}>
                        <Input id="id" onChange={this.changeState} value={this.state.id}></Input>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="??????????????????">
                        <Select defaultValue='1' onChange={this.changeType}>
                            <Option value='2'>??????</Option>
                            <Option value='1'>??????</Option>
                            <Option value='3'>?????????</Option>
                        </Select>
                    </Form.Item>
                    <br />
                    <Button onClick={this.sendRequest} style={{ width: 200 }} type="primary" shape="round" size='large'>
                        ??????????????????
                  </Button>
                    <br />


                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br />

                </>
            )
        }
        else if (this.state.type == '1') {
            var dataSource = [
                {
                    key: '??????',
                    val: this.state.name
                },
                {
                    key: '??????',
                    val: this.state.gender == 'm' ? '???' : '???'
                },
                {
                    key: '??????',
                    val: this.state.id
                },
                {
                    key: '??????',
                    val: this.state.status
                },
                {
                    key: '??????',
                    val: this.state.college
                },
                {
                    key: '??????',
                    val: this.state.major
                },
                {
                    key: '??????',
                    val: this.state.class
                },
                {
                    key: '????????????',
                    val: this.state.id_card
                },
                {
                    key: '????????????',
                    val: this.state.contact
                }
            ];
            console.log(dataSource);
            return (
                <>
                    <br /><br /><br /><br /><br />
                    <Form.Item label="????????????" {...formItemLayout}>
                        <Input id="id" onChange={this.changeState} value={this.state.id}></Input>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="??????????????????">
                        <Select defaultValue='1' onChange={this.changeType}>
                            <Option value='2'>??????</Option>
                            <Option value='1'>??????</Option>
                            <Option value='3'>?????????</Option>
                        </Select>
                    </Form.Item>
                    <br />
                    <Button onClick={this.sendRequest} style={{ width: 200 }} type="primary" shape="round" size='large'>
                        ??????????????????
                    </Button>
                    <br /><br />

                    <Table dataSource={dataSource} columns={columns} />

                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br />

                </>
            )
        }
        else {
            var dataSource = [
                {
                    key: '??????',
                    val: this.state.name
                },
                {
                    key: '??????',
                    val: this.state.gender == '0' ? '???' : '???'
                },
                {
                    key: '??????',
                    val: this.state.id
                },
                {
                    key: '??????',
                    val: this.state.department
                },
                {
                    key: '????????????',
                    val: this.state.id_card
                },
                {
                    key: '????????????',
                    val: this.state.contact
                }
            ];
            console.log(dataSource);
            return (
                <>
                    <br /><br /><br /><br /><br />
                    <Form.Item label="????????????" {...formItemLayout}>
                        <Input id="id" onChange={this.changeState} value={this.state.id}></Input>
                    </Form.Item>
                    <Form.Item {...formItemLayout} label="??????????????????">
                        <Select defaultValue='1' onChange={this.changeType}>
                            <Option value='2'>??????</Option>
                            <Option value='1'>??????</Option>
                            <Option value='3'>?????????</Option>
                        </Select>
                    </Form.Item>
                    <br />
                    <Button onClick={this.sendRequest} style={{ width: 200 }} type="primary" shape="round" size='large'>
                        ??????????????????
                  </Button>
                    <br /><br />

                    <Table dataSource={dataSource} columns={columns} />

                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                    <br />

                </>
            )
        }
    }
}

/*
var utype = "student";

function handleChange(value) {
    utype = value;
}


const requestSendGet = () => {
    var content = document.getElementById("findid");
    const params = {
        id: content.value,
        type: utype
    }

    axios
        .get('https://localhost:8080',
            { params },
            {
                headers: { 'content-type': 'application/x-www-form-urlencoded' }
            }
        ).then((response) => {

        })
}*/