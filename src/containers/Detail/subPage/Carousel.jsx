import React, { Component } from 'react';

import { Carousel } from 'antd';

import './style.css';

// const ChildPage = () => (
//     <div>
//         <h3>haha</h3>
//     </div>
// );

export default class CarouselView extends Component {
    render () {
        return (
            <div>
                <Carousel
                    autoplay
                >
                    <div>
                        <h3>haha</h3>
                    </div>
                    <div>
                        <h3>haha</h3>
                    </div>
                    <div>
                        <h3>haha</h3>
                    </div>
                </Carousel>
            </div>
        );
    }
}
