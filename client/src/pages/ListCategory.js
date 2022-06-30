import { Table, Button, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useQuery, useMutation } from 'react-query';
import { API } from '../config/api';
import DeleteData from '../components/modal/DeleteData';
import imgEmpty from '../assets/empty.svg';
import '../style/Category.css';

function ListCategory() {

    let navigate = useNavigate();

    const title = 'Category Admin';
    document.title = 'DumbMerch | ' + title;

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let { data: categories, refetch } = useQuery('categoriesCache', async () => {
        const response = await API.get('/categories');
        return response.data.categories;
    });

    const handleEdit = (id) => {
        navigate(`/admin/edit-category/${id}`);
    };

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/category/${id}`);
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

    const addCategory = () => {
        navigate('/admin/add-category');
    };
    
    return (
        <div className='table-container'>
            <body className='border-category'>
            <Row>
                <Col>
                    <h3 className="table-title mb-5">List Category</h3>
                </Col>
                <Col className="text-end">
                    <Button
                        onClick={addCategory}
                        className="btn-danger"
                        style={{ width: '100px' }}
                    >
                        Add
                    </Button>
                </Col>
                <Col xs="12">
                    {categories?.length !== 0 ? (
                        <Table striped bordered hover variant="dark">
                            <thead className=''>
                                <tr>
                                    <th style={{ width: '35%' }}>No</th>
                                    <th style={{ width: '35%' }}>Category Name</th>
                                    <th style={{ width: '30%' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map((item, index) => (
                                    <tr key={index}>
                                        <td className='pt-3'>{index + 1}</td>
                                        <td className='pt-3'>{item.name}</td>
                                        <td><Button variant="success ps-5 pe-5 mt-2 me-2 w-40" onClick={() => { handleEdit(item.id); }} className="button-table">Edit</Button>
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
                            <div className="mt-3 text-danger">No data category</div>
                        </div>
                    )}
                </Col>
            </Row>
            <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose}
            />
            </body>
        </div>
    );
}

export default ListCategory;