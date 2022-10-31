const UusiBlogForm = ({ handleSubmit, newBlogTitle, handleBlogTitleChange,
      newBlogAuthor, handleBlogAuthorChange,
      newBlogURL, handleBlogURLChange }) => {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div>title: <input value={newBlogTitle} onChange={handleBlogTitleChange} /></div>
          <div>author: <input value={newBlogAuthor} onChange={handleBlogAuthorChange} /></div>
          <div>url: <input value={newBlogURL} onChange={handleBlogURLChange} /></div>
          <div><button type="submit">create</button></div>
        </form>
      </div>
    )
}

export default UusiBlogForm