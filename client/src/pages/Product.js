import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query';
import { API } from '../config/api';
import React, { Component } from "react";
import Slider from "react-slick";
import imgEmpty from '../assets/empty.svg';
import '../style/Home.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

function Product() {

  const settings = {
    className: "center",
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 4,
    swipeToSlide: true,
    afterChange: function(index) {
      console.log(
        `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
      );
    }
  };

    const title = 'Shop';
    document.title = 'DumbMerch | ' + title;
  
    let { data: products } = useQuery('productsCache', async () => {
      const response = await API.get('/products');
      return response.data.data;
    });
  
    console.log(products);

    return (
        <div className='user-container'>
          <body className='border-home'>
            <h1 className='user-text ms-2 mb-5' style={{ color: '#F74D4D'}}>Product</h1>
            <Container className='ms-0'>
            {products?.length !== 0 ? (
                <Row>
                  <Slider {...settings}>
                    {products?.map((item, index) => (
                        <Col sm="2" key={index}>
                            <Card className="product-card mb-2" style={{ backgroundColor: '#212121', borderRadius: '10px', width: '95%'}}>
                                <Card.Img variant="top" src={item.image} style= {{ width: '100%', height: '300px', objectFit: 'cover' }} className='product-image' />
                                <Card.Body>
                                    <Link style={{ textDecoration: 'none' }} to={`/user/product/detail/${item.id}`}>
                                        <Card.Title style={{ color: '#F74D4D', fontSize: '18px', fontWeight: '700' }}>{item.name}</Card.Title>
                                    </Link>
                                    <p className='product-card-text'>Rp. {item.price}</p>
                                    <p className='product-card-text'>Stock : {item.qty}</p>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    </Slider>
                </Row>
                          ) : (
                            <Col>
                              <div className="text-center pt-5">
                                <img
                                  src={imgEmpty}
                                  className="img-fluid"
                                  style={{ width: '40%' }}
                                  alt="empty"
                                />
                                <div className="mt-3 text-danger">No data product</div>
                              </div>
                            </Col>
                          )}
            </Container>
            </body>
        </div>
    );
}

export default Product;