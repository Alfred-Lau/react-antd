import React, { Component } from 'react';
import { Avatar, Icon, Card } from 'antd';

export default class CardView extends Component {

    constructor (props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount () {
        setTimeout(() => {
            this.setState({
                loading: false
            });
        }, 3000);
    }
    render () {
        return (
            <div>
                <Card
                    loading={this.state.loading ? 'loading' : ''}
                    style={{ width: 240 }}
                    cover={<img alt='cover' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
                    hoverable
                    actions={[<Icon type='setting' />, <Icon type='edit' />, <Icon type='ellipsis' />]}
                    extra={<a>More</a>}>
                    <Card.Meta avatar={<Avatar type='user'></Avatar>} title='这是一张示例图片' description='这是一段实例描述'>
                    </Card.Meta>
                </Card>
            </div>
        );
    }
}
