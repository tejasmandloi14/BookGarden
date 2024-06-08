import React from 'react'
import { useState} from 'react'
import axios from '../axios'


export default function Form() {

  const [display,setDisplay]=useState('');

  const initialState = {
    name: "",
    rating: "",
    plot: "",
    publisher: ""
  };


  const [data, setData] = useState({
    name: '', rating: '', plot: '', publisher: ''
  });

  const clearState = () => {
    setData({ ...initialState });
    setDisplay('')
  };
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setData({ ...data, [name]: value })
  }

  const submitPost = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/books', {
        Name: data.name,
        Rating: data.rating,
        Plot: data.plot,
        Publisher: data.publisher
      }
      )
        .then((res) => console.log(res.data));
        setDisplay('Success')
    }
    catch (error) {
      console.log(error.message)
    }
  }


  return (
    <div className='full-form'>
      <h3>Form to Post a Book</h3>
      <form className='form'>
        <label htmlFor="name">Name:</label>
        <input id='name' onChange={handleInputs} name='name' value={data.name} type="text" placeholder='Name of the Book' />
        Rating :
        <div className='rating'>

          <input type='radio' id='b1' name='rating' onChange={handleInputs} value='1' />
          <label htmlFor="b1">1</label><br />
          <input type='radio' id='b2' name='rating' onChange={handleInputs} value='2' />
          <label htmlFor="b2">2</label><br />
          <input type='radio' id='b3' name='rating' onChange={handleInputs} value='3' />
          <label htmlFor="b3">3</label><br />
          <input type='radio' id='b4' name='rating' onChange={handleInputs} value='4' />
          <label htmlFor="b4">4</label><br />
          <input type='radio' id='b5' name='rating' onChange={handleInputs} value='5' />
          <label htmlFor="b5">5</label><br />
        </div>
        Plot of the Book : <textarea name='plot' onChange={handleInputs} value={data.plot} placeholder=' Enter Plot here !' />
        Publisher : <input type="text" name='publisher' onChange={handleInputs} value={data.publisher} placeholder=' Publisher' />
        <div className="form-all-btn">
          <input type="submit" className='delbtn' value="Submit" onClick={submitPost} />
          <input type="reset" className='delbtn' value="Reset" onClick={clearState} />
        </div>
        <h3>{display}</h3>
      </form>
      <h6 className='admintxt'>* only admin users can post a book</h6>

    </div>
  )
}
