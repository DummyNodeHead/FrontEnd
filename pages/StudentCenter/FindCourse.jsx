import { Input, Button, Form } from 'antd';
import React from 'react';
import { Select, Table } from 'antd';
import axios from 'axios'
const { Option } = Select;

var thisM;
var coursefind = 'name';

function handleChange(value) {
  coursefind = value;
}

const transformFormData = (obj) => {
  let formData = new FormData()

  for (let k in obj) {
    formData.append(k, obj[k])
  }

  return formData
}

const requestSendGet = () => {

  data.length = 0;
  var coursefindkey = document.getElementById("key");
  var coursefindtype = coursefind;
  const params = {
    key: coursefindkey.value,
    type: coursefindtype
  }
  axios
    .get('http://127.0.0.1:8000/api/show/',
      { params },
      {
        headers: { 'content-type': 'application/x-www-form-urlencoded' }
      }
    ).then(function (response) {
      thisM.setState({
        isLoaded: true
      });
      var datalist = [];
      datalist = response.data.data;

      console.log(datalist);
      data.length = 0;
      let temp = [...data];
      for (const i in datalist) {
        /*object.key=i;
        object.id=datalist[i].id;
        console.log(datalist[i].id);
        object.course_name=datalist[i].course_name;
        console.log(object);
        data.push(object);*/
        temp.push({
          key: i,
          id: datalist[i].ID,
          course_name: datalist[i].name,
          credit: datalist[i].credit,
          description: datalist[i].description,
          teacher_ID: datalist[i].teacher_ID,
          stock: datalist[i].stock
        })
      }

      thisM.setState({
        courses: temp
      })



      console.log(data);
    })
    .catch(function (error) {
      console.log(error);
      thisM.setState({
        isLoaded: false,
        error: error
      })
    })
}


export default class FindCourse extends React.Component {


  /* componentDidMount(){
       const params = {
           key: coursefindkey.value,
           type: coursefindtype
       }
       const _this=this;    //????????????this???????????????????????????this????????????????????????????????????????????????
       axios.get('https://localhost:8080',
       {params}
       )
       .then(function (response) {
         data=response.data
         
       })
       .catch(function (error) {
         console.log(error);
       })
     }*/

  constructor(props) {
    super(props);
    this.state = {
      courses: [],
      isLoaded: false,
      username: "",
      psw: "",
      type: ""
    }
  }
  componentDidMount() {
    thisM = this;
    var name = this.props.location.state.username;
    var passw = this.props.location.state.psw;
    var tp = this.props.location.state.type;
    this.setState({
      username: name,
      psw: passw,
      type: tp

    })
  }
    

  render() {
      console.log(this.state.courses);
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
      if(this.state.isLoaded)
    {

      return (

        <>
          <br /><br /><br /><br /><br />
          <Form.Item label="???????????????" {...formItemLayout}>
            <Input id="key"></Input>
          </Form.Item>
          <Form.Item {...formItemLayout} label="??????">
            <Select id="coursefindtype" defaultValue="name" onChange={handleChange}>
              <Option value="name">?????????</Option>
              <Option value="ID">?????????</Option>
              <Option value="teacher_ID">????????????</Option>
              <Option value="credit">??????</Option>
            </Select>
          </Form.Item>
          <br />
          <Button onClick={requestSendGet} style={{ width: 200 }} type="primary" shape="round" size='large'>
            ??????????????????
            </Button>
          <br />
          <br />
          <br />  <Table columns={columns} dataSource={this.state.courses} /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br />

        </>
      )
    }
    else {
      return (

        <>
          <br /><br /><br /><br /><br />
          <Form.Item label="???????????????" {...formItemLayout}>
            <Input id="key"></Input>
          </Form.Item>
          <Form.Item {...formItemLayout} label="??????">
            <Select id="coursefindtype" defaultValue="name" onChange={handleChange}>
              <Option value="name">?????????</Option>
              <Option value="ID">?????????</Option>
              <Option value="teacher_ID">????????????</Option>
              <Option value="credit">??????</Option>
            </Select>
          </Form.Item>
          <br />
          <Button onClick={requestSendGet} style={{ width: 200 }} type="primary" shape="round" size='large'>
            ??????????????????
              </Button>
          <br />


          <br />
          <br /><br /><br /><br /><br /><br /><br /><br />
          <br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
          <br />

        </>
      )
    }
  }
}




const columns = [
  {
    tille: '????????????',
    dataIndex: 'id',
  },
  {
    title: '?????????',
    dataIndex: 'course_name',
  },
  {
    title: '??????',
    dataIndex: 'credit',
  },
  {
    title: '??????',
    dataIndex: 'description',
  },
  {
    title: '????????????',
    dataIndex: 'teacher_ID',
  }

]
var data = [];



