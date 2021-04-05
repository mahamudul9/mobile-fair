import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Admin from '../Admin/Admin';
import './AddProduct.css'

const AddProduct = () => {
  const [imageUrl, setImageUrl] = useState(null);

  const handleImageUpload = (event) => {
    console.log(event.target.files[0])
    const imageData = new FormData();
    imageData.set('key', '12caf47a4cf168a514d9d05cbd75b40c');
    imageData.append('image', event.target.files[0]);

    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        console.log(response);
        setImageUrl(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = data => {
    const newData = {
      name: data.name,
      storage: data.storage,
      price: data.price,
      image: imageUrl
    }
    console.log(newData);
    

    fetch('https://mobile-fair.herokuapp.com/addProduct', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then(res=>res.json())
      .then(data=>console.log("server response: ",data))

      alert("Product added");
  };
  return (
    <div className="d-flex">
      <div><Admin /></div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="name" placeholder="Enter Name" ref={register({ required: true })} />
          {errors.name && <span>This field is required</span>}
          <input name="storage" placeholder="Enter Storage" ref={register({ required: true })} />
          {errors.storage && <span>This field is required</span>}<br></br>
          <input name="price" placeholder="Enter Price" ref={register({ required: true })} />
          {errors.price && <span>This field is required</span>}
          <input name="image" type="file" onChange={handleImageUpload} /><br />
          <input type="submit" value="Save" style={{backgroundColor:'#009933', color:'white'}} />
        </form>
      </div>
    </div>
  );
};

export default AddProduct;