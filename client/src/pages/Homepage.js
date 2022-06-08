import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DefaultLayout from '../components/DefaultLayout';
import { Row, Col } from 'antd';
import Item from "../components/Item";
import { useDispatch } from 'react-redux';

const Homepage = () => {

    const [itemsData, setItemsData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('fruits');

    const categories = [
        {
            name: 'fruits',
            imageURL: 'https://media.istockphoto.com/photos/assortment-of-colorful-ripe-tropical-fruits-top-view-picture-id995518546?k=20&m=995518546&s=612x612&w=0&h=yPdMHr-CL9JD8eLnyBr2_hFpx6l3jUBU9UEwwdnNfAU='
        },
        {
            name: 'vegetables',
            imageURL: 'https://www.liveinhomecare.com/wp-content/uploads/2020/09/vegetables-that-are-healthier-for-you-cooked-than-raw.jpg'
        },
        {
            name: 'meat',
            imageURL: 'https://mh-1-stockagency.panthermedia.net/media/previews/0022000000/22801000/~variety-of-meat-products-including-ham_22801636_high.jpg'
        },
    ]

    const dispatch = useDispatch();

    const getAllItems = () => {

        dispatch({ type: 'showLoading' });

        axios.get("/api/items/get-all-items").then((response) => {
            setItemsData(response.data);
            dispatch({ type: 'hideLoading' });
        }).catch((error) => {
            console.log(error);
            dispatch({ type: 'hideLoading' });
        })
    };

    useEffect(() => {
        getAllItems();
    }, []);

    return (
        <DefaultLayout>

            <div className='d-flex my-3 categories'>
                {
                    categories.map((category) => {
                        return <div className={`d-flex category ${selectedCategory === category.name && 'selected-category'}`}
                            onClick={() => setSelectedCategory(category.name)}>
                            <h4>{category.name}</h4>
                            <img src={category.imageURL} width='80' height='50'></img>
                        </div>
                    })
                }
            </div>

            <Row gutter={20}>
                {itemsData.filter((i) => i.category === selectedCategory).map((item, index) => {
                    return <Col xs={24} lg={6} md={12} sm={6}>
                        <Item
                            item={item}
                            title={item.name}
                            imageSrc={item.image}
                            price={item.price}></Item>
                    </Col>
                })}
            </Row>
        </DefaultLayout>
    )
}

export default Homepage;