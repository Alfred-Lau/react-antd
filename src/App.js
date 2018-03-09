import { Table, Icon, Divider } from 'antd'
import React from 'react'

import reqwest from 'reqwest'

import '../node_modules/antd/dist/antd.css'
import './App.css'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href=''>{text}</a>
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address'
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span><a href=''>Action 一 {record.name}</a> <Divider type='vertical' /> <a href=''>Delete</a> <Divider type='vertical' /> <a href='' className='ant-dropdown-link'>More actions <Icon type='down' /></a></span>
  )
}]




class App extends React.Component{
  
  state = {
    data: []
  }
  
  fetch = () => {
    const api = 'http://localhost:3030/'
    reqwest(api).then((data)=>{
      this.setState({
        data:data.data
      })
    })
  }
  
  componentDidMount() {
    this.fetch()
  }
  
  render() {
    // 联动选择框配置该项
    const rowSelection = {
      // 选择框被选择事件
      onChange: (keys, rows) => {
        console.log(keys, rows)
      },
      // 测试每一项的属性
      getCheckboxProps: record => (
        {
          name: record.name,
          disabled: record.name === 'alf lau'
        }
      )
    }
    return (
      <div className="app">
        <Table
          dataSource={this.state.data}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    )
  }
}  

export default App
