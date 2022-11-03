import { useState } from 'react'

const UusiBlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }
  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }
  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
      likes: 0
    })
    console.log('formin addBlog createBlog:', createBlog)
    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>
      <form onSubmit={addBlog}>
        <div>title: <input id='title' value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
        <div>author: <input id='author' value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
        <div>url: <input id='url' value={newBlogURL} onChange={handleBlogURLChange} /></div>
        <div><button id='create-button' type="submit">create</button></div>
      </form>
    </div>
  )
}

export default UusiBlogForm