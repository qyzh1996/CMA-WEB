/* 资源库 */
import React, { Component, PropTypes } from 'react';
import { Row, Col, Card, Tabs, Select, Checkbox, Popconfirm, Button, Icon, Table, Form, Input, InputNumber, DatePicker, Divider, Modal, Tooltip, AutoComplete, message } from 'antd';
import ReactDOM from 'react-dom';

/* 前后端交互 */
import $ from 'lib/jquery-3.3.1';
import { getStore } from 'store/globalStore';
import { setItems } from 'common/basic/reducers/ItemReducer';
import { getAllStaffTrainingData } from './FetchData';
import { getAllStaffTrainingsService, addOneStaffTrainingService, deleteOneStaffTrainingService } from "services";

/* 子组件 */
import StaffTrainingInspectView from "./StaffTrainingInspectView";
import StaffTrainingAddView from "./StaffTrainingAddView";

const FormItem = Form.Item;

class StaffTrainingListComponent extends React.Component{
  
  constructor(props){
    super(props);

    this.unsubscribe = getStore().subscribe(this.refreshData);//redux同步数据

    this.inspectViewTabName = '培训与考核详情';
    this.inspectView = StaffTrainingInspectView;

    this.columns=[
      {
        title: '培训编号',
	dataIndex: 'trainingId',
	key: 'trainingId',
	sorter: (a,b) => a.trainingId-b.trainingId,
      },
      {
        title: '培训名称',
	dataIndex: 'program',
	key: 'program',
      },
      {
        title: '培训日期',
	dataIndex: 'trainingDate',
	key: 'trainingDate',
      },
      {
        title: '操作',
	dataIndex: 'operation',
	key: 'operation',
	render: (text,record) =>{
	
	  let trainData = null;
	  for(var i = this.state.data.length-1;i>=0;i--){
	    if(this.state.data[i].trainingId == record.trainingId)
	      trainData = this.state.data[i];
	  }
	  
	  var props = {
	    item: record,
	    data: trainData,
	  };
	 
	  return (
	    <span>
	      <a href="javascript:void(0);" onClick={ () => {this.showCurRowMessage(props)} }>查看详情</a>
	    </span>
	  );
	}
      }
    ];
  }

  state={
    data: [],//存放后端取来的数据
    loading: false,
    visible: false,//设置对话框状态
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  /* 同步数据 */
  refreshData = () => {
    this.setState({
      data: getStore().getState().StaffTraining.items
    });
  }

  /* 跳转到查看详情页面 */
  showCurRowMessage = (props) => {
    this.props.addTab(this.inspectViewTabName,this.inspectViewTabName, Form.create()(this.inspectView), props);
  }

  /* 新增培训与考核记录 */
  addNewTrainRecord = () => {
    const form = this.formRef.props.form;
    form.validateFields((err,values) => {
      if(err){
        return;
      }

      let tmpData = values;//获取用户输入的数据
      tmpData.trainingDate = tmpData.trainingDate.format("YYYY-MM-DD");//日期信息格式化

      $.ajax({
        type:"post",
	url: addOneStaffTrainingService,
	data: tmpData,
	async: false,
	success:function(d){
	  message.success("添加成功!");i
	}
      });

      form.resetFields();

      this.setState({ visible: false });

      getAllStaffTrainingData();//添加数据至后台成功后，重新获取列表信息

    });
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  }

  /* 调出新增对话框 */
  showModal = () => { 
    this.setState({ visible: true });
  }

  /* 撤除新增对话框 */
  handleCancel = () => {
    this.setState({ visible: false });
  }

  componentDidMount() {
    this.props.form.validateFields();
  }

  getAll = () => {
    $.get(getAllStaffTrainingsService,null,(res)=>{
      let traindata = res.data;
      let store = getStore();
      store.dispatch(setItems(traindata,'StaffTraining'));
    });
  }

  componentWillMount() {
    this.getAll();
  }

  render(){
    const { loading, visible } = this.state;
    const columns=this.columns;
    return (
        <div>
          <Table columns={columns}
	        dataSource={this.state.data}
	        loading={this.state.loading}
	        onChange={this.refreshData}
          />
          <div>
            <Button type="primary" loading={this.state.loading} onClick={ this.showModal } >
              新增
            </Button>
	    <StaffTrainingAddView
	      wrappedComponentRef = { this.saveFormRef }
	      visible = { this.state.visible }
	      onCancel = { this.handleCancel }
	      onCreate = { this.addNewTrainRecord }
	    />
	  </div>
	  <div>
	    <Button 
	      type="danger"
	      /* TO DO: onClick = { this.deleteOneStaffTraining } */
	    >
	      删除
	    </Button>
          </div>
        </div>
    );
  }

}

export default StaffTrainingListComponent;

