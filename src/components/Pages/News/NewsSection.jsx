import { List, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import axiosClient from '../../../axios-client';
import NewsDetails from './NewsDetails';
import dayjs from 'dayjs';

const NewsSection = () => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedNewsId, setSelectedNewsId] = useState(null);
    const [newsData, setNewsData] = useState(null);
    const [isNewsFetching, setNewsFetching] = useState(true);

    useEffect(() => {
        fetchNewsData();
    }, [])

    /**
     * @return "news": [
        {
            "news_id": 1,
            "title": "New Feature Release",
            "content": "We are excited to announce the release of our new feature!",
            "author": "John Smith",
            "status": 1,
            "created_at": "2023-06-07T10:02:34.000000Z",
            "updated_at": null,
            "deleted_at": null
        },
     */

    const fetchNewsData = async () => {
        setNewsFetching(true);
        const response = await axiosClient.get('/news');
        setNewsData(response.data.news);
        setNewsFetching(false);
    }

    const getNewsFromId = () => {
        return newsData.find(
            (news) => {
                console.log(news);
                if (news.news_id === selectedNewsId) return news;
            }
        );
    }

    const data = newsData && newsData.map((news, index) => ({
        key: index + 1,
        id: news.news_id,
        title: news.title,
        author: news.author,
        content: news.content,
        createDate: news.created_at,
    }));

    const handleClick = (newsId) => {
        setModalOpen(true);
        setSelectedNewsId(newsId);
    }

    return (
        <>
            <h3>News: </h3>
            {data && <List
                itemLayout="vertical"
                size="large"
                loading={isNewsFetching}
                pagination={{
                    pageSize: 3,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.key}
                        onClick={() => {
                            handleClick(item.id);
                        }}
                    >
                        <List.Item.Meta
                            title={<p>{dayjs(item.createDate).format('DD/MM/YYYY H:mm') + ' - '}<b>{item.title}</b></p>}
                            description={'by ' + item.author}
                        />
                    </List.Item>
                )}
            />}
            {isModalOpen && <Modal
                open={isModalOpen}
                onCancel={() => { setModalOpen(false) }}
                footer={null}>
                <NewsDetails newsData={getNewsFromId()} />
            </Modal>}
        </>
    );
}
export default NewsSection;