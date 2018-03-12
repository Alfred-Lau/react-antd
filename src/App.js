import { Table, Icon, Divider, Button, message, notification, Avatar, Popover, Rate, Modal, Form, Input, Checkbox } from 'antd'
import React from 'react'
import reqwest from 'reqwest'

import '../node_modules/antd/dist/antd.css'
import './App.css'

const FormItem = Form.Item;

class WrapperForm extends React.Component{

handleSubmit = (e) => {
  e.preventDefault();
  this
    .props
    .form
    .validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      reqwest({
        url: 'http://localhost:3030/login',
        method: 'post',
        data: values,
        success: (res) => {
          
          if (res === 'success') {
            console.log(res)
          }
        },
        error: (err) => {
          console.log(err)
        }
    })
      }
    });
}
  
  render() {
    const { getFieldDecorator } = this.props.form;
    
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          Or <a href="">register now!</a>
        </FormItem>
      </Form>
    )
  }
}


const WrappedNormalLoginForm = Form.create()(WrapperForm);

class App extends React.Component{
  
  state = {
    loading: false,
    visible: false,
    isLogin:true,
    data: [],
    selectedRowKeys: [], //设置默认值
    filterInfo:null,
    sortOrder: null
  }
  
  fetch = () => {
    const api = 'http://localhost:3030/'
    reqwest(api).then((data)=>{
      this.setState({
        data
      })
    })
  }
  
  componentDidMount() {
    this.fetch()
  }

  start = () => {
    this.setState({
      loading: true
    })

    setTimeout(() => {
      this.setState({
        loading: false,
        selectedRowKeys:[]
      })
    }, 5000);
  }

  sortAge = () => {
    
  }
  
  clearFilter = () => {
    
  }

  clearAll = () => {
    
  }

  handleChange = (pagatation, filiters, sorter) => {
    message.info('sort')
    this.setState({
      filterInfo: filiters,
      sortOrder:sorter
    })
  }

  handleDelete = (key) => {
    reqwest({
      url:'http://localhost:3030/delete',
      method: 'post',
      data: { id: key },
      success: (resp) => {
        console.log(resp)
      }
    }).then((resp) => {
      if (resp === 'ok') {
        let data = this.state.data
        data.splice(data.findIndex((item) => {
          return item.key === key + 1
        }), 1)
        this.setState({
          data
        })
      }
    })
  }

  showMessage = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
  });
  }

  generateRandom = () => {
    reqwest({
      url:'http://localhost:3030/generateRandom',
      method:'get'
    }).then((resp) => {
      if (resp === 'ok') {
        this.fetch()
      }
    })
  }

  toggleLogin = () => {
    if (this.state.isLogin) {
      this.setState({
        isLogin: false
      })
    } else {
      this.setState({
        visible:true
      })
    }
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    let { selectedRowKeys, filterInfo, sortOrder, visible, loading } = this.state

    // 空值检查,注意let和const
    sortOrder = sortOrder || {}
    filterInfo = filterInfo || {}
    
    // 联动选择框配置该项
    const rowSelection = {
      // 通过 rowSelection.selections 自定义选择项，默认不显示下拉选项，设为 true 时显示默认选择项。
      selections: [{
        key: 'odd',
        text: 'select odd idnex',
        onSelect: (keys) => {
          let newKsys = keys.filter((key) => {
            return key % 2 === 0 ? true : false 
          }) 
          this.setState({
            selectedRowKeys:newKsys
          })
        }
      }],
      // onSelection : this.onSelection,//有什么用？
      hideDefaultSelections:true,
      // rowSelection.selectedRowKeys 来控制选中项
      selectedRowKeys,
      // 选择框被选择事件
      onChange: (keys, rows) => {
        this.setState({
          selectedRowKeys:keys
        })
      },
      // 测试每一项的属性
      getCheckboxProps: record => (
        {
          name: record.name,
          disabled: record.name === 'alf lau'
        }
      )
    }
    const hasSelected = selectedRowKeys.length > 0 ? true : false
    const title = '潇湘'
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href=''>{text}</a>,
        filters:[
          { text: 'Joe', value: 'Joe' },
          { text: 'Jim', value: 'Jim' },
        ],
        filteredValue: filterInfo.name || null
      }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
        sorter: (a, b) => a.age - b.age,
        sortOrder: sortOrder.columnKey === 'age' && sortOrder.order
      }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
      }, {
        title: 'Action',
        key: 'action',
        render: (text, record, index) => (
          <span>
            <span onClick={this.showMessage}>{record.name}</span>
            <Divider type='vertical'/>
            <span onClick={this.handleDelete.bind(this,record.key)}>Delete</span>
            <Divider type='vertical'/>
            <a href='' className='ant-dropdown-link'>More actions
              <Icon type='down'/></a>
          </span>
        )
      }
    ]
    const content = (
        <div>
          <p>
            <Rate allowHalf defaultValue={2.5} />
          </p>
          <p>
          <Button type='default' onClick={this.toggleLogin}>
            {this.state.isLogin
              ? '登出'
              : '登录'
            }
          </Button>
          </p>
        </div>
    )


    return (
      <div className="app">  
        <div style={{marginBottom:16,marginTop:16}}>
          <Button
            type='primary'
            onClick={this.start}
            loading={loading}
            disabled={!hasSelected}
          >
          Reload
          </Button>
          <span style={{marginLeft:8}}>
            {`一共选择了${this.state.selectedRowKeys.length}条数据`}
          </span>
          <Button type='default' style={{ marginLeft: 10 }} onClick={this.sortAge}>sort age</Button>
          <Button type='default' style={{ marginRight: 10, marginLeft: 10 }} onClick={this.clearFilter}>clear filter</Button>
          <Button type='default' onClick={this.clearAll}>clear all</Button>
          <Button type='primary' style={{ marginLeft: 10, marginRight: 10 }} onClick={this.generateRandom}>生成随机数据</Button>
          <Popover
            content={content}
            title={this.state.isLogin
              ? `当前登录用户：${title}`
              :'未登录'              
            }>
          <Avatar
            src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
            className='avatar'
            ></Avatar>
          </Popover>  
        </div>
        <Table
          dataSource={this.state.data}
          columns={columns}
          rowSelection={rowSelection}
          onChange={this.handleChange}
        />

        <Modal
          visible={visible}
          title="用户登录"
          onCancel={this.handleCancel}
          footer={null}
          className='modal-outside'
        >   
        <WrappedNormalLoginForm></WrappedNormalLoginForm>  
        </Modal>
      </div>
    )
  }
}  

export default App
