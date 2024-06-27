import {useState} from "react";
// here, we import some react hook component for maintain state in functional component
import { CiCirclePlus } from "react-icons/ci";
// importing icon for better design from react icons

import Popup from 'reactjs-popup';
// importing poput from reactjs popup to add new blog details
import Blog from "../Blog";
// importing blog componet to render every blog 

import './index.css'

const bloglist = [
    {id: 1, title: "Artificial Intelligence", author: "Jitin Gupta", date: '20-06-2024', description: "Welcome to AI Insights, your premier destination for exploring the world of artificial intelligence. Our blog is dedicated to bringing you the latest trends, breakthroughs, and thought-provoking discussions in AI. Whether you're an AI enthusiast, a tech professional, or just curious about the future of technology, AI Insights has something for you.", summary: "Welcome to AI Insights, your premier destination for exploring the world of artificial intelligence", imageUrl: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgZWtCZYmOQ1bLHPhEk4G_mmWxyKTc2O9o3MQqBZ-DVHud83-Au0JG0dQL4wvLiGc9euCjjDQhJq9_h9M0d7vu7uvXHGXLyjadWv-sonaOquTTXHx_LaA9TPKIY7uTK16EDZ0z7RMXzGjc/w400-h225/ai.jpg"},
    {id: 2, title: "Books", author: "Sahil Arora", date: '20-06-2024', description: "Welcome to Book Haven, your ultimate destination for book lovers! Whether you're an avid reader, an aspiring author, or someone who simply enjoys a good story, Book Haven is the perfect place for you to explore, discover, and connect with the world of literature.",  summary: "Welcome to Book Haven, your ultimate destination for book lovers! Whether you're an avid reader", imageUrl: "https://th.bing.com/th/id/R.bb28b54399761fc65ff403c94299497d?rik=1NEC4UndQdaaqw&riu=http%3a%2f%2fwww.zastavki.com%2fpictures%2foriginals%2f2014%2fCreative_Wallpaper_Stack_of_books_on_the_bench_082401_.jpg&ehk=uia0wBMuDRBSjo12VEn3TJvW6d2oN7ye2qe%2fm5nIywo%3d&risl=&pid=ImgRaw&r=0"},
    {id: 3, title: "Mobiles", author: "Shivani Singh", date: '20-06-2024', description: "Welcome to Mobile Matters, your go-to source for everything related to mobile technology. From the latest smartphones and tablets to cutting-edge apps and accessories, Mobile Matters provides you with the insights and information you need to stay ahead in the fast-paced world of mobile technology.",  summary: "Welcome to Mobile Matters, your go-to source for everything related to mobile technology", imageUrl: "https://cdn.mos.cms.futurecdn.net/LaTpyDmuXxPWyXhxnLxYyV.jpg"},
    {id: 4, title: "Sattelites", author: "Varun Solanki", date: '20-06-2024', description: "Welcome to Satellite Insights, your premier source for all things related to satellites and space technology. Whether you're a space enthusiast, a student, or a professional in the field, Satellite Insights offers in-depth articles, news, and resources to keep you informed and inspired about the fascinating world of satellites.",  summary: "Welcome to Satellite Insights, your premier source for all things related to satellites and space technology", imageUrl: "https://th.bing.com/th/id/R.569173ab61fa61c843af76794ea072ea?rik=nDPMuUGg%2bIjQ9g&riu=http%3a%2f%2fspacefellowship.com%2fwp-content%2fuploads%2f2014%2f11%2fGalileo_satellite_in_orbit.jpg&ehk=0bc%2fsSjtvBvu6bv9OwMxxGZaqlfcEzJmpJLnVZ%2bUVfw%3d&risl=&pid=ImgRaw&r=0"},
    {id: 5, title: "Foods", author: "Sanya Malik", date: '20-06-2024', description: "Welcome to Culinary Delights, your ultimate guide to the world of food and gastronomy. Whether you’re a home cook, a professional chef, or a food enthusiast, Culinary Delights offers a rich array of content to inspire, educate, and tantalize your taste buds.",  summary: "Welcome to Culinary Delights, your ultimate guide to the world of food and gastronomy", imageUrl: "https://www.localsamosa.com/wp-content/uploads/2021/07/Indian-food-1.jpg"},
    {id: 6, title: "Pollution", author: "Prashant Sahu", date: '20-06-2024', description: "Welcome to Pollution Awareness, your dedicated resource for understanding and combating pollution. Our blog aims to inform, educate, and inspire action towards a cleaner, healthier planet. Whether you’re an environmentalist, a concerned citizen, or simply curious about pollution issues, Pollution Awareness provides comprehensive and engaging content to keep you informed.",  summary: "Welcome to Pollution Awareness, your dedicated resource for understanding and combating pollution", imageUrl: "https://www.worldatlas.com/r/w1200/upload/36/da/02/pollution.jpg"},
]
// here some sample blog details are used to render

const Bloglist = () => {
    // here, sample details stored in local storage for persisting after first render
    const [blogs, setBlogs] = useState(() => {
        
        if(JSON.parse(localStorage.getItem('blogs') === null)){
            localStorage.setItem('blogs', JSON.stringify(bloglist))
        } 
        return JSON.parse(localStorage.getItem('blogs'))
    })
    // here, we use useState for maintaining state for user inputs

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [desc, setDesc] = useState('')
    const [isErr, setIsErr] = useState(false)
    const [isVisible, setIsVisible] = useState(false)
    const [errMsg, setErrMsg] = useState('')
    

    // adding author details of blog from the user
    const onAddAuthor = event => {
        setAuthor(event.target.value)
    }

    // adding description of blog from the user
    const onAddDesc = event => {
        setDesc(event.target.value)
    }

    // adding image of blog from the user
    const onAddImage = event => {
        const file = event.target.files[0];
        const imagePreview = URL.createObjectURL(file);
        setImgUrl(imagePreview)
    }

    // adding title of blog from the user
    const onAddTitle = event => {
        setTitle(event.target.value)
    }

    // adding blog details from the user to the local storage and provide some guidance for filling valid details
    const onAddNewBlog = event => {
        event.preventDefault()

        if(title.length === 0 && author.length === 0 && imgUrl.length === 0 && desc.length === 0){
            setIsErr(true)
            setErrMsg("Please provide all details to add new blog")
        } else {
            const id = blogs.length*2
            const summary = desc.slice(0,90)
            const newBlog = {
                id,
                title,
                author,
                date: new Date().toDateString(),
                summary,
                description: desc,
                imageUrl: imgUrl,
            }
            const newBlogList = [...blogs, newBlog]
            setBlogs(newBlogList)
            localStorage.setItem('blogs', JSON.stringify(newBlogList))
            setIsVisible(true)
            setAuthor('')
            setDesc('')
            setTitle('')
            setErrMsg('')
            setIsErr(false)
            setIsVisible(false)
        }
    }

    return(
        // here, we used semantic element for better readability
        <article>
            <section className="header-container">
                <header className="header">
                    <p>Jatin Blogs</p>
                    <button>Login</button>
                </header>
                <section className="blog-welcome-container">
                    <h1>Welcome to Our Blog Platform</h1>
                    <p>A modern and intuitive platform where you can share your thoughts, stories, and experiences with the world. Our app is designed to provide a seamless and enjoyable blogging experience for both writers and readers.</p>
                    <Popup 
                        modal
                        trigger={
                            <button type="button" className="blog-btn">
                                <CiCirclePlus size={25} color="#ffffff" />
                                Create a New Blog
                            </button>
                        }>
                        {close => (
                            <form className='popup-container' onSubmit={onAddNewBlog}>
                                <p className='popup-heading'>Add Blog Details</p>
                                <p>Title:</p>
                                <input type='text' value={title} placeholder='Type here'className='user-input' onChange={onAddTitle}/>
                                <p>Author:</p>
                                <input type='text' value={author} placeholder='Type here'className='user-input' onChange={onAddAuthor}/>
                                <p>Description:</p>
                                <textarea cols="40" rows="5" type='text' value={desc} placeholder='Type here'className='user-input' onChange={onAddDesc}/>
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
                                    <button type='submit' className='create-button' onClick={() => {isVisible && close()}}>Add</button>
                                </div>
                            </form>
                        )}
                    </Popup>
                </section>
            </section>
            <section className="bloglist-container">
                {blogs.map(eachBlog => (
                    <Blog blogDetails={eachBlog} key={eachBlog.id} />
                ))}
            </section>
        </article>
    )
}

export default Bloglist