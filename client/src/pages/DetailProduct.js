import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { Button } from "react-bootstrap"
import { Carousel } from 'react-bootstrap';
import { API } from '../config/api';
import '../style/Detail.css';

function DetailProduct() {

  let navigate = useNavigate();
  let { id } = useParams();

  let { data: product } = useQuery('productCache', async () => {
    const response = await API.get('/product/' + id);
    return response.data.data;
  });

  useEffect(() => {

    const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
    const myMidtransClientKey = "SB-Mid-client-OoS-Fpv-MJio-sJD";

    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);
    return () => {
      document.body.removeChild(scriptTag);
    };
  }, [])

  const handleBuy = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const data = {
        idProduct: product.id,
        idSeller: product.users.id,
        price: product.price,
      };

      const body = JSON.stringify(data);

      const response = await API.post('/transaction', body, config);
      const token = response.data.payment.token;

      window.snap.pay(token, {
        onSuccess: function (result) {
          console.log(result);
          navigate("/user/profile");
        },
        onPending: function (result) {
          console.log(result);
          navigate("/user/profile");
        },
        onError: function (result) {
          console.log(result);
        },
        onClose: function () {
          alert("you closed the popup without finishing the payment");
        },
      })
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="detail-container row">
      <body className='border-detail'>
              <div className='container h-100'>
                <div className='container h-100'>
                  <div className='row alin-items-center h-100 pt-5 pb-5'>                  
                    <form className='col-12 wow fadeInUp border-0 bg-transparent' data-wow-delay='0.2s'>
                      <div className='card border-0 bg-transparent'>                  
                        <div className='card mb-3 border-0 bg-transparent'>
                          <div className='row g-0'>
                            <div className='col-md-6'>
                            
                            <Carousel>
                              <Carousel.Item>
                                <img
                                  className="d-block rounded ms-5"
                                  src={product?.image}
                                  alt="First slide"
                                  style= {{ width: '80%', height: '500px', objectFit: 'cover' }}
                                />                              
                              </Carousel.Item>
  
                              <Carousel.Item>
                                <img
                                  className="d-block rounded ms-5"
                                  src={product?.image}
                                  alt="Second slide"
                                  style= {{ width: '80%', height: '500px', objectFit: 'cover' }}
                                />                             
                              </Carousel.Item>
  
                              <Carousel.Item>
                                <img
                                  className="d-block rounded ms-5"
                                  src={product?.image}
                                  alt="Third slide"
                                  style= {{ width: '80%', height: '500px', objectFit: 'cover' }}
                                />                            
                              </Carousel.Item>
                            </Carousel>
                            </div>
                            
                            <div className='col-md-6 border-0'>
                              <div className='card-body'>
                                <div className='title-product' style={{ color: '#F74D4D'}}>
                                  <h1>{product?.name}</h1>                              
                                </div>
                                <div className='stock mb-5 text-white'>
                                  <p>Stock : {product?.qty}</p>                              
                                </div>
                                <div className='description mt-5 text-white'>
                                  <p>{product?.desc}</p>
                                </div>
                                <div className='price mt-5 mb-5 text-white'>
                                  <h4 style={{ color: '#F74D4D'}}>Rp.{product?.price}</h4>
                                </div>
                                <div className='d-grid gap-2'>
                                  <Button onClick={(e) => handleBuy.mutate(e)} style={{ color: 'white', backgroundColor: '#F74D4D'}} variant="danger" className="button-login-login">Buy</Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </body>
    </div>
  );
}

export default DetailProduct;