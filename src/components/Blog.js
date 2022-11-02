import { useState } from 'react'

const Blog = ({ blog }) => {
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
        <button onClick={() => setShowDetails(true)}>view</button>
      </div>
    )
  }
  else if (showDetails === true){
    return(
      <div style={blogStyle}>
        <div>{blog.title} <button onClick={() => setShowDetails(false)}>hide</button></div>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button>like</button></div>
        <div>{blog.author}</div>
        <div><button>remove</button></div>
      </div>
    )
  }
}

export default Blog