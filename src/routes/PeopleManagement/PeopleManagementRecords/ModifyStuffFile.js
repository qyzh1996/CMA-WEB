import React from 'react';
import { Form, Input, Icon, Row, Col, Button, Card} from 'antd';
import {Table, Divider, Modal, Avatar, Upload, message, Select, DatePicker, InputNumber} from 'antd';

import {baseAddress} from 'services';
import $ from 'lib/jquery-3.3.1';

const FormItem = Form.Item;

import {getStore} from 'store/globalStore';
import {setItems} from 'common/basic/reducers/ItemReducer';
import {getStaffManagement, getStaffFile} from './Function';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const ModifyStuffFile = Form.create()(
class extends React.Component {
	state = {
    	fileList: [],
    	uploading: false,
  	}

	constructor(props){
		super(props);
	}

	handleSubmit = (e)=>{
		e.preventDefault();
    	this.props.form.validateFields((err, values) => {
      		if (!err) {
      			//TODO:ajax
                const { fileList } = this.state;

                let temp=values;
                temp.id = this.props.item.id;
                temp.fileImage = fileList[0];
                //console.log(temp);

 
    			const formData = new FormData();
      			formData.append('fileImage', fileList[0]);
                formData.append('fileId', temp.fileId);
                formData.append('id', this.props.item.id);
                formData.append('fileLocation', temp.fileLocation);
    			
    			console.log(formData.get('fileImage'));
    			console.log(formData.get('fileId'));

      			
      			$.ajax({
		      		type: "post",
		      		url: baseAddress+"/cma/StaffFile/modifyOne",
		      		data: formData,
                    processData: false,
                    contentType: false,
			      	async: false,
                    success: function(d){
                        message.success("修改成功");
                    }
		    	 });

                getStaffFile();
        		//console.log('Received values of form: ', values);
      		}
    	});
	}

    render() {
    	//console.log(this.props.item);

    	  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    		const formItemLayout = {
    		    labelCol: {
    		        xs: { span: 24 },
    		        sm: { span: 8 },
    		    },
    		    wrapperCol: {
    		        xs: { span: 24 },
    		        sm: { span: 16 },
    		    },
    		};
    		const defaultVal = this.props.item;

    		//const imageAddr = baseAddress+"/cma/StaffFile/getStaffPicture/"+defaultVal.fileImage;
    		const imageAddr = baseAddress+"/cma/StaffFile/getStaffPicture/7.jpg";
    		const props = {
    		    action: '//jsonplaceholder.typicode.com/posts/',
    		    onRemove: (file) => {
    		        this.setState(({ fileList }) => {
    		          	const index = fileList.indexOf(file);
    		          	const newFileList = fileList.slice();
    		          	newFileList.splice(index, 1);
    		          	return {
    		            	fileList: newFileList,
    		          	};
    		        });
    		    },
    		    beforeUpload: (file) => {
    		        this.setState(({ fileList }) => ({
    		          	fileList: [file],
    		        }));
    		        return false;
    		    },
    		    fileList: this.state.fileList,
    		};

        return (
        	<div>
            <Form 
                layout="vertical"
                onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="姓名:">
                    {this.props.item.name}
                </FormItem>
                <FormItem {...formItemLayout} label="档案编号">
                    {getFieldDecorator('fileId', {
                    	
                        rules: [{ required: true, message: '请输入档案编号！' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="档案存放位置">
                    {getFieldDecorator('fileLocation', {
                    	
                        rules: [{ required: true, message: '请输入档案存放位置！' }],
                    })(
                        <Input />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label="修改档案扫描件">
                    {getFieldDecorator('fileImage', {
                       
                    })(  
                        <Upload {...props}>
                            <Button>
                                <Icon type="upload" /> 上传档案扫描件
                            </Button>
                        </Upload>
                     )}
                </FormItem>
                <FormItem>
			       	<Button
			           	type="primary"
			           	htmlType="submit"
			           	type="button"
			           	disabled={hasErrors(getFieldsError())}
			       	>修改
			       	</Button>
		        </FormItem>
		    </Form>
		    </div>
      	);
    }
}
);

export default ModifyStuffFile;