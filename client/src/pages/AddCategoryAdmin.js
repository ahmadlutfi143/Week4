import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { API } from '../config/api';
import '../style/AddCategory.css';

function AddCategoryAdmin() {

    let navigate = useNavigate();
    const [category, setCategory] = useState('');
  
    const title = 'Category admin';
    document.title = 'DumbMerch | ' + title;
  
    const handleChange = (e) => {
      setCategory(e.target.value);
    };
  
    const handleSubmit = useMutation(async (e) => {
      try {
        e.preventDefault();

        const config = {
          headers: {
            'Content-type': 'application/json',
          },
        };

        const body = JSON.stringify({ name: category });

        const response = await API.post('/category', body, config);
  
        navigate('/admin');
      } catch (error) {
        console.log(error);
      }
    });

    return (
            <div className="edit-container">
              <body className='border-addCategory'>
                <p className="table-title">Add Category</p>
                <Form  onSubmit={(e) => handleSubmit.mutate(e)}>
                <Form.Group>
                    <Form.Control onChange={handleChange} value={category} name="categoryName" type="text" placeholder="Category Name" className='mt-5'></Form.Control>
                </Form.Group>
                <Button variant="success" type='submit' className="button-login-login mt-3" style={{ borderRadius: '5px', color: 'white', backgroundColor: '#56C05A', paddingRight: '3%', paddingLeft: '3%' }}>Save</Button>
                </Form>
              </body>
            </div>
    );
}

export default AddCategoryAdmin;