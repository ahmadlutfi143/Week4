import { Table, Button, Modal, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import DeleteData from '../components/modal/DeleteData';
import imgEmpty from '../assets/empty.svg';
import '../style/Product.css';

function ListProduct() {

  let navigate = useNavigate();

  const title = 'Product Admin';
  document.title = 'DumbMerch | ' + title;

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let { data: products, refetch } = useQuery('productsCache', async () => {
    const response = await API.get('/products');
    return response.data.data;
  });

  const addProduct = () => {
    navigate('/admin/add-product');
  };

  const handleEdit = (id) => {
    navigate(`/admin/edit-product/${id}`);
  };

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete(`/product/${id}`);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <div className='table-container'>
      <body className='border-product'>
      <Row>
        <Col>
          <h3 className="table-title mb-5">List Product</h3>
        </Col>
        <Col className="text-end">
          <Button
            onClick={addProduct}
            className="btn-danger"
            style={{ width: '100px' }}
          >
            Add
          </Button>
        </Col>
        <Col xs="12">
          {products?.length !== 0 ? (
            <Table striped bordered hover variant="dark">
              <thead className=''>
                <tr>
                  <th>No&emsp;</th>
                  <th>Photo&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</th>
                  <th>Product Name&emsp;&emsp;</th>
                  <th style={{ width: '15%' }}>Product Desc</th>
                  <th>Price</th>
                  <th>Qtyy&emsp;</th>
                  <th style={{ width: '30%' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((item, index) => (
                  <tr key={index}>
                    <td className='pt-4'>{index + 1}</td>
                    <td className='pt-2'><img src={item.image} style={{ width: '70px', height: '70px', objectFit: 'cover' }} alt={item.name} /></td>
                    <td className='pt-4'>{item.name}</td>
                    <td className='pt-4'>{item.desc}</td>
                    <td className='pt-4'>{item.price}</td>
                    <td className='pt-4'>{item.qty}</td>
                    <td><Button variant="success ps-5 pe-5 mt-2 me-2 w-40" onClick={() => { handleEdit(item.id); }}  className="button-table">Edit</Button>
                      <Button variant="danger ps-5 pe-5 mt-2 w-40" onClick={() => { handleDelete(item.id); }} className="ms-2 button-table">Delete</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="text-center pt-5">
              <img
                src={imgEmpty}
                className="img-fluid"
                style={{ width: '40%' }}
                alt="empty"
              />
              <div className="mt-3 text-danger">No data product</div>
            </div>
          )}
        </Col>
      </Row>
      <DeleteData
        setConfirmDelete={setConfirmDelete}
        show={show}
        handleClose={handleClose}
      />
      </body>
    </div>
  );
}

export default ListProduct;