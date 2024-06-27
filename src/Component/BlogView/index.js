// here, importing useParams from react-router-dom for getting id to render blog details
import {Link, useParams} from 'react-router-dom';
import {useState} from 'react';

// here, importing reactjs-popup to update blog details provide by the user
import Popup from 'reactjs-popup';
import './index.css';

const BlogView = props => {
    const {id} = useParams()
    // here getting blog details from the local storage
    const blogList = JSON.parse(localStorage.getItem('blogs'))
    // filtering specific blog details which is trigered by the user
    const blogDetails = blogList.filter(each => each.id === parseInt(id))
    const{title, imageUrl, author, date, description} = blogDetails[0]

    // maintaining state by using react hooks so that user can update the details
    const [newTitle, setTitle] = useState(title)
    const [newAuthor, setAuthor] = useState(author)
    const [newImgUrl, setImgUrl] = useState(imageUrl)
    const [newDesc, setDesc] = useState(description)
    const [isErr, setIsErr] = useState(false)
    const [errMsg, setErrMsg] = useState('')

    // updating auther of the blog by the user
    const onAddAuthor = event => {
        setAuthor(event.target.value)
    }

    // updating description of blog by the user
    const onAddDesc = event => {
        setDesc(event.target.value)
    }

    // updating image of blog by the user
    const onAddImage = event => {
        const file = event.target.files[0];
        const imagePreview = URL.createObjectURL(file);
        setImgUrl(imagePreview)
    }

    // updating title of blog by the user
    const onAddTitle = event => {
        setTitle(event.target.value)
    }
    
    // when user click on the delete button here, deleting blog details and updating local storage
    const onDeleteBlog = () => {
        const newBlogList = blogList.filter(eachBlog => eachBlog.id !== parseInt(id))
        localStorage.setItem('blogs', JSON.stringify(newBlogList))
    }

    // here, updating blog details from the user
    const onUpdateBlog = () => {
        if(title.length === 0 && author.length === 0 && newImgUrl.length === 0 && newDesc.length === 0){
            setIsErr(true)
            setErrMsg("Please provide all details to update blog")
        } else {
            const newBlogList = blogList.filter(eachBlog => eachBlog.id !== parseInt(id))
            const summary = newDesc.slice(0, 90)
            const newBlog = {
                id,
                title: newTitle,
                author: newAuthor,
                date: new Date().toDateString(),
                summary: summary,
                description: newDesc,
                imageUrl: newImgUrl,
            }
            const updatedBlogList = [...newBlogList, newBlog]
            localStorage.setItem('blogs', JSON.stringify(updatedBlogList))
        }
    }

    return(
        // here, semantic element is used for better readability
        <figure className='blog-view-container'>
            <img className='blog-view-image' src={imageUrl} alt={blogDetails.title} />
            <figcaption>
                <h1>Welcome to {title} Blog</h1>
                <p>{description}</p>
                <section className='date-and-author-section'>
                    <p className='blog-view-author'><span>Published on </span>{date}</p>
                    <p className='blog-view-author'><span>Author: </span>{author}</p>
                </section>
                <section>
                    <Popup 
                        modal
                        trigger={
                            <button type='button' className='btn'>Edit Blog Details</button>
                        }>
                        {close => (
                            <section className='popup-container' onSubmit={onUpdateBlog}>
                                <p className='popup-heading'>Edit Blog Details</p>
                                <p>Title:</p>
                                <input type='text' value={newTitle} placeholder='Type here'className='user-input' onChange={onAddTitle}/>
                                <p>Author:</p>
                                <input type='text' value={newAuthor} placeholder='Type here'className='user-input' onChange={onAddAuthor}/>
                                <p>Description:</p>
                                <textarea cols="40" rows="5" type='text' value={newDesc} placeholder='Type here'className='user-input' onChange={onAddDesc}/>
                                <p>Image:</p>
                                <input type="file" accept="image/*" className="user-input" onChange={onAddImage} />
                                {isErr && <p className="err-msg">*{errMsg}</p>}
                                <div className='btn-container'>
                                    <button
                                        type="button"
                                        className="trigger-button"
                                        onClick={() => close()}
                                        >
                                        Cancel
                                    </button>
                                    <button type='button' className='create-button' onClick={onUpdateBlog}><Link to="/" className='blog-view-link'>Update</Link></button>
                                </div>
                            </section>
                        )}
                    </Popup>
                    <button type='button' className='btn' onClick={onDeleteBlog}><Link className='link' to="/">Delete Blog</Link></button>
                </section>
            </figcaption>
        </figure>
    )
}

export default BlogView
