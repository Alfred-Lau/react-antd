import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon, Tag } from 'antd';

import reqwest from 'reqwest';
import ProfileHeader from '../../components/ProfileHeader';

import './style.css';

const IconText = ({type, text}) => (
    <span><Icon type={type} style={{ marginRight: 8 }}/> {text}</span>
);

const ListHeader = () => (
    <div>
    header
        <Tag color='#3e3e3e'>
      #3e3e3e
        </Tag>
    </div>
);

const ListFooter = () => (
    <div>
    footer
    </div>
);

export default class Profile extends Component {

    constructor (props) {
        super(props);
        this.state = {
            data: []
        };
    }

    fetchData () {
        const api = 'http://localhost:3030/profile-list';
        const config = {
            url: api,
            method: 'get'
        };
        reqwest(config).then((res) => {
            this.setState({
                data: res
            });
        });
    }
    componentDidMount () {
        this.fetchData();
    }

    render () {
        console.log(this.state.data);
        return (
            <div>
                <ProfileHeader></ProfileHeader>
                <List
                    className='list-box'
                    itemLayout='vertical'
                    size='large'
                    header={(
                        <ListHeader></ListHeader>
                    )}
                    footer={(
                        <ListFooter></ListFooter>
                    )}
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item
                            key={item.key}
                            actions={[<IconText type='star-o' text='156' />, <IconText type='like-o' text='156' />, <IconText type='message' text='2' />]}
                            extra={<img width={272} alt="logo" src="../../static/img/bac.png" />}>
                            <List.Item.Meta
                                avatar={<Avatar src='../../static/img/avatar.png' />}
                                title={
                                    <Link to={`/detail/${item.key}`}>
                                        {item.title}
                                    </Link>
                                }
                                description={item.description} />
                            {item.content}
                        </List.Item>
                    )}></List>
            </div>
        );
    }
}
