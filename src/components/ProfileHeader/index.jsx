import React, { Component } from 'react';
import { Avatar, Badge, Divider, Icon } from 'antd';

import './style.css';

export default class ProfileHeader extends Component {
    render () {
        return (
            <div className='container'>
                <Badge dot>
                    <Avatar icon='user'>
                    </Avatar>
                </Badge>
                <ul className='profile-header-ul'>
                    <li className='item'>
            Docs
                    </li>
                    <Divider type='vertical' />
                    <li className='item'>
            Markets
                    </li>
                    <Divider type='vertical' />
                    <li className='item'>
            Emails
                    </li>
                </ul>
                <Icon
                    type='github'
                    className='github'
                ></Icon>
            </div>
        );
    }
}
