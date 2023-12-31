import React, { useEffect, useState } from 'react'
import ContentContext from '../../../helpers/Context/ContentContext';
import { Spin } from 'antd';

const Content = (props) => {
    const [isContentLoading, setContentLoading] = useState(false);
    const { Component, ...args } = props

    useEffect(() => {
        setContentLoading(false);
    }, [Component])

    return (
        <ContentContext.Provider value={{ isContentLoading: isContentLoading, setContentLoading: setContentLoading }}>  
            <Spin tip="Loading" spinning={isContentLoading}>
                <Component {...args} />
            </Spin>
        </ContentContext.Provider>
    )
}

export default Content