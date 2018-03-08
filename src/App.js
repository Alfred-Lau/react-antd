import { Table, Icon, Divider } from 'antd'
import React from 'react'

import reqwest from 'reqwest'

import '../node_modules/antd/dist/antd.css'
import './App.css'

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href='#'>{text}</a>
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
    <span><a href='#'>Action 一 {record.name}</a> <Divider type='vertical' /> <a href='#'>Delete</a> <Divider type='vertical' /> <a href='#' className='ant-dropdown-link'>More actions <Icon type='down' /></a></span>
  )
}]




class App extends React.Component{
  
  state = {
    data: []
  }
  
  fetch = () => {
    const api = 'http://localhost:3030/'
    reqwest(api).then((data)=>{
      console.log(data)
    })
  }
  
  componentDidMount() {
    this.fetch()
  }
  
  render() {
    return (
      <div className="app">
        <Table/>
      </div>
    )
  }
}  

export default App
