import {
    Icon,
    Button,
    Form,
    Input,
    Checkbox,
    message,
    notification
} from 'antd'
import React from 'react'
import reqwest from 'reqwest'
import PropTypes from 'prop-types'

const FormItem = Form.Item;

class WrapperForm extends React.Component {

    constructor(props, ctx) {
        super(props)
    }

    componentDidMount() {
    }

    onClose = () => {
        const config = {
            message: 'enjoy your time',
            description:'this is a desc'

        }
        notification.success(config)

    }

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
                                const duration = 5
                                message.success('欢迎使用', duration, this.onClose)
                                this.props.loginFn()
                            } else {
                                message.info('请检查您的输入')
                            }
                        },
                        error: (err) => {
                            message.info(err)
                        }
                    })
                }
            });
    }

    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your username!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "user" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            placeholder="Username"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input your Password!'
                            }
                        ]
                    })(
                        <Input
                            prefix={< Icon type = "lock" style = {{ color: 'rgba(0,0,0,.25)' }}/>}
                            type="password"
                            placeholder="Password"/>
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true
                    })(
                        <Checkbox>Remember me</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    Or
                    <a href="">register now!</a>
                </FormItem>
            </Form>
        )
    }
}

/* 

React的context的使用场景：
但是随着我们的应用变的越来越复杂，组件嵌套也变的越来越深，有时甚至要从最外层将一个数据一直传递到最里层（比如当前user的信息）。

理论上，通过prop一层层传递下去当然是没问题的。不过这也太麻烦啦，要是能在最外层和最里层之间开一个穿越空间的虫洞就好了。

幸运的是，React的开发者也意识到这个问题，为我们开发出了这个空间穿越通道 —— Context。

使用React context的四件套：
    1.定义父元素getChildContext方法；
    2.定义父元素APP.childContextTypes对象；
    3.子元素引入"prop-types"；
    4.子元素定义Child.contextTyeps对象

*/
WrapperForm.contextTypes = {
    showLoginModal: PropTypes.bool
}

const WrappedNormalLoginForm = Form.create()(WrapperForm);

export default WrappedNormalLoginForm
