import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom'
import dateFormat from 'dateformat';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { API } from '../config/api';
import DumbMerch from '../assets/DumbMerch.png'
import imgBlank from '../assets/blank-profile.png';

function Profile() {

    const title = 'Profile';
    document.title = 'DumbMerch | ' + title;
  
    const { id } = useParams()
    const [state] = useContext(UserContext);
  
    let { data: profile } = useQuery('profileCache', async () => {
      const response = await API.get('/profile/' + id);
      return response.data.data;
    });
  
    let { data: transactions } = useQuery('transactionsCache', async () => {
      const response = await API.get('/transactions');
      return response.data.data;
    });

    return (
        <div className='user-container'>
            <body className='border-profile'>
            <div className='container h-100'>
              <div className='container h-100'>
                <div className='row alin-items-center h-100 pt-5 pb-5'>
                  <form className='col-12 wow fadeInUp mt-3 border-0 bg-transparent' data-wow-delay='0.2s'>
                    <div className='row g-0'>                 
                      <form className='col-8 wow fadeInUp border-0 bg-transparent' data-wow-delay='0.2s'>
                        <h1 className='title-profile mb-5' style={{ color: '#F74D4D'}}>My Profile</h1>
                          <div className='card border-0 bg-transparent'>
                            <div className='card mb-3 border-0 bg-transparent'>
                              <div className='row g-0'>
                                <div className='col-md-5'>
                                  <img src={profile?.image ? profile.image : imgBlank} className="rounded float-start mb-4" alt=""  width='80%'/>
                                </div>
                                <div className='col-md-7 border-0'>
                                  <div className='card-body'>
                                    <div className='mb-4'>
                                      <h5 style={{ color: '#F74D4D'}}>Name</h5> 
                                      <h5 style={{ color: 'white'}}>{state.user.name}</h5>                             
                                    </div>
                                    <div className='mb-4'>
                                      <h5 style={{ color: '#F74D4D'}}>Email</h5> 
                                      <h5 style={{ color: 'white'}}>{state.user.email}</h5>                             
                                    </div>
                                    <div className='mb-4'>
                                      <h5 style={{ color: '#F74D4D'}}>Phone</h5> 
                                      <h5 style={{ color: 'white'}}>{profile?.phone ? profile?.phone : '-'}</h5>                             
                                    </div>
                                    <div className='mb-4'>
                                      <h5 style={{ color: '#F74D4D'}}>Gender</h5> 
                                      <h5 style={{ color: 'white'}}>{profile?.gender ? profile?.gender : '-'}</h5>                             
                                    </div>
                                    <div className='mb-4'>
                                      <h5 style={{ color: '#F74D4D'}}>Adress</h5> 
                                      <h5 style={{ color: 'white'}}>{profile?.address ? profile?.address : '-'}</h5>                             
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </form>

                        <form className='col-4 wow fadeInUp border-0 bg-transparent' data-wow-delay='0.2s'>
                          <h1 className='title-profile mb-5' style={{ color: '#F74D4D'}}>My Transaction</h1>
                          <div style={{ width: '600px' }}>
                          {transactions?.map((item, index) => (
                            <div className="card pt-3 ps-3 pe-3 mb-3 register-custom" style={{ backgroundColor: '#303030', borderRadius: '5px', width: '80%'}}>
                              <div className='card border-0 bg-transparent'>
                                <div className='card border-0 bg-transparent'>
                                  <div className='row g-0'>
                                    <div className='col-md-3' key={index}>
                                      <img src={item.products.image} className="rounded float-start" alt=""  width='90%'/>
                                    </div>
                                    <div className='col-md-6 border-0'>
                                      <div className='card-body'>
                                        <div className='data-transaction'>
                                          <li style={{ color: '#F74D4D', fontSize: '15px'}}>{item.products.name}</li> 
                                          <li style={{ color: '#F74D4D', fontSize: '11px'}}>{dateFormat(item.createdAt, 'dddd, d mmmm yyyy')}</li>
                                          <li style={{ color: 'white', fontSize: '11px'}}>Price : Rp.{item.price}</li> 
                                          <p style={{ color: 'white', fontSize: '13px', marginTop: '25px'}}>Sub Total : Rp.{item.price}</p>                             
                                        </div>                            
                                      </div>
                                    </div>
                                  <div className='col-md-3'>
                                    <img src={DumbMerch} className="rounded float-end mt-4" alt=""  width='65%'/>
                                  </div>
                                  <div
                                  className={`status-transaction-${item.status} rounded h-100 w-100 d-flex align-items-center justify-content-center`}>
                                  {item.status}
                                </div>                              
                                </div>
                              </div>
                            </div>
                          </div>
                          ))}
                        </div>
                      </form>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </body>
        </div>
    );
}

export default Profile;


