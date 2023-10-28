import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { format } from 'date-fns'
import API from './api/posts';
import DataContext from './context/DataContext'

const NewPost = () =>{

    const [postTitle, setPostTitle] = useState(''),

          [postBody, setPostBody] = useState(''),

          { posts, setPosts } = useContext(DataContext),

          history = useHistory()


    const handleSubmit = async (e) =>{

        e.preventDefault()

        const id = posts.length ? posts[posts.length - 1].id + 1 : 1,

                datetime = format(new Date(), 'MMM dd, yyyy pp'),

                newPost = { id, title: postTitle, body: postBody, datetime }

        try{

            const response = await API.post('/posts', newPost),

                allPosts = [...posts, response.data]
            
            setPosts(allPosts)

            setPostTitle('')

            setPostBody('')

            history.push('/')

        }catch(err){

            console.log(`Error: ${err.message}`)

        }

    }


    return(

        <main className="NewPost">

           <h2>New Post</h2>


           <form onSubmit={handleSubmit} className="newPostForm">

                <label htmlFor="postTitle">Title:</label>

                <input 
                    type="text" 
                    required
                    id="postTitle" 
                    value={postTitle}
                    onChange={e => setPostTitle(e.target.value)}
                />


                <label htmlFor="postBody">Post:</label>

                <textarea
                    id="postBody"
                    required
                    value={postBody}
                    onChange={e => setPostBody(e.target.value)}
                />

                <button type="submit">Submit</button>

           </form>

        </main>

    )

}

export default NewPost