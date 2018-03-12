import React, { Component } from 'react';

import reqwest from 'reqwest';

import { Tabs } from 'antd';
import { CardView, UploadView, MenuView, CarouselView } from './subPage';

const Tab = Tabs.TabPane;

export default class Detail extends Component {
    constructor (props) {
        super(props);
        this.state = {
            id: 0,
            data: ''
        };
    }

    componentDidMount () {
        const { id } = this.props.match.params;
        setTimeout(() => {
            this.setState({
                id});
        }, 3000);

        this.fetchDetailData(id);
    }

    fetchDetailData (id) {
        const api = `http://localhost:3030/detail/${id}`;
        reqwest(api).then((res) => {
            this.setState({
                data: res
            });});
    }

    render () {
        return (
            <div>
                <Tabs>
                    {/* 使用tab的时候不能缺少tab和key这两个必填选项 */}
                    <Tab tab='Card' key='1'>
                        <CardView></CardView>
                    </Tab>
                    <Tab tab='Upload' key='2'>
                        <UploadView></UploadView>
                    </Tab>
                    <Tab tab='Carousel' key='3'>
                        <CarouselView></CarouselView>
                    </Tab>
                    <Tab tab='Menu' key='4'>
                        <MenuView></MenuView>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
