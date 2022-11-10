import { useState } from 'react'

const Blog = ({ blog, kirjautunut, removeBlog, addLike }) => {
  const [showDetails, setShowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (showDetails === false) {
    return(
      <div>
        {blog.title}
        <button id='view-button' onClick={() => setShowDetails(true)}>view</button>
      </div>
    )
  }
  else if (showDetails === true && kirjautunut === blog.user.username){
    return(
      <div style={blogStyle} className="togglableContent">
        <div>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id='like-button' onClick={() => addLike(blog.id)}>like</button></div>
        <div>{blog.author}</div>
        <div><button id='remove-button' onClick={() =>
          removeBlog(blog.id, blog.user.username, blog.title, blog.author)}>remove</button></div>
      </div>
    )
  }
  else if (showDetails === true && kirjautunut !== blog.user.username){
    return(
      <div style={blogStyle} className="togglableContent">
        <div>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button id='like-button' onClick={() => addLike(blog.id)}>like</button></div>
        <div>{blog.author}</div>
      </div>
    )
  }
}

export default Blog