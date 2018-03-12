import React, { Component } from 'react';

import {Upload, Button, Icon} from 'antd';

import './style.css';
export default class UploadView extends Component {
    render() {
        const props = {
            
        };
        return (
            <div className='upload-wrapper'>
                {/* 当组件参数太多的时候可以使用{...props},在render函数之中定义props作为参数列表 */}    
                <Upload {...props}>
                    <Button>
                        <Icon type='upload' /> click to upload
                    </Button>
                </Upload>
            </div>
        );
    }
}
