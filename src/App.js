import { Table, Icon, Divider, Button } from 'antd'
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
    data: [],
    selectedRowKeys:[] //设置默认值
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
  
  render() {
    const { loading, selectedRowKeys } = this.state
    
    // 联动选择框配置该项
    const rowSelection = {
      // 通过 rowSelection.selections 自定义选择项，默认不显示下拉选项，设为 true 时显示默认选择项。
      selections: [{
        key: 'odd',
        text: 'select odd idnex',
        onSelect: (keys) => {
          console.log(keys)
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
    const hasSelected = selectedRowKeys.length > 0 ? true:false

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
        </div>
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
