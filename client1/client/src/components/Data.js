import React, { useReducer } from 'react'
import axios from '../axios';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Data() {

    const [reducerValue,forceUpdate] = useReducer(x=>x+1,0)

    const clearState = () => {
        setComm('');
        
      };

    const deleteComment = async (e) => {
        try {
            const res = await axios.delete(`/books/${e.target.value}/comment/${e.target.id}`)
                .then((res) => console.log(res));
                forceUpdate();
        }
        catch (error) {
            console.log(error)
        }
    }



    const [comm, setComm] = useState('')

    const postComment = async (e) => {
        try {
            const res = await axios.post(`/books/${e.target.value}/comment/`, {
                Comment: comm
            })
                .then((res) => console.log(res));
                forceUpdate();
                clearState();
        }
        catch (error) {
            console.log(error)
        }
    }

    const deletePost = async (e) => {
        try {
            console.log(e.target.key)
            const res = await axios.delete(`/books/${e.target.value}`)
                .then((res) => console.log(res));
                forceUpdate();
        }

        catch (error) {
            console.log(error);
        }
    }

    let value;
    const handleInputs = (e) => {
        value = e.target.value;
        setComm(value)
    }

    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get('/books');
            setData(res.data.books)
            console.log(res.data)
        }
        catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getApiData();
    }, [reducerValue]);

    return (
        <div id="container">
                <motion.h1 id='my-book-data' initial={{x:'-100vw'}} animate={{x:0}} transition={{type:'spring',stiffness:150,delay:0.5}}>What Should I Read Next ? <span className="my-book-data-img"></span></motion.h1>
                <div className='allposts'>
                    {data.map((item) =>
                        <motion.div key={item._id} whileHover={{scale:1.05}}>
                            <div className='post'>
                                <h5><span className='b'>Name :</span> {item.Name}</h5>
                                <h5><span className='b'>Rating :</span> {item.Rating}</h5>
                                <h5><span className='b'>Plot :</span> {item.Plot}</h5>
                                <h5><span className='b'>Publisher :</span> {item.Publisher}</h5>
                                <h5><span className='b'>Comments :</span> </h5>
                                <label htmlFor="comment">Add a Comment :</label>
                                <input type="text" name="comment" onChange={handleInputs} value={comm} id={item._id} />
                                <button onClick={postComment} className='form-all-btn' value={item._id} >Add Comment</button>
                                <h4>{item.Comments.map((comm) =>
                                    <>
                                        <div className="comments" >

                                            <h6>{comm.Comment}</h6>
                                            <h6>Author : {comm.Author.firstname + ' ' + comm.Author.lastname}</h6>
                                            <button className='delbtn' onClick={deleteComment} value={item._id} id={comm._id} >Delete Comment</button>
                                        </div>
                                    </>
                                )
                                }</h4>
                                <div className="post-btn">

                                    <button className='delbtn' onClick={deletePost} value={item._id} >Delete Post</button><h6 className="admintxt">*only admin users</h6>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </div>
            </div>
    )
}
