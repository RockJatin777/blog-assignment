import {Link} from 'react-router-dom';
import './index.css';

// here, link imported from react-router-dom for navigation

const Blog = props => {
    // here, we get blogdetails
    const {blogDetails} = props

    return(
        // here, we give path for navigation
        <Link className='link' to={`/blog/${blogDetails.id}`}>
            <section className='blog-container'>
                <img className='blog-image' src={blogDetails.imageUrl} alt={blogDetails.title} />
                <h1>{blogDetails.title}</h1>
                <p className='author'><span>Author: </span>{blogDetails.author}</p>
                <p>{blogDetails.summary}....</p>
                <p className='author'><span>Published on </span>{blogDetails.date}</p>
            </section>
        </Link>
    )
}

// here we export the blog component

export default Blog