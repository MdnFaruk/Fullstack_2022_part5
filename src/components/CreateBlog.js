import React, { useState } from 'react'

const BlogForm = ({ creatingBlog }) => {
  const [bloginfo, setBlogInfo] = useState({ title: '', author: '', url: '' })

  const addBlog = event => {
    event.preventDefault()
    creatingBlog(bloginfo)
    setBlogInfo({ ...bloginfo,title: '', author: '', url: '' })
  }
  const handleBlog = ({ target }) => {
    setBlogInfo({ ...bloginfo, [target.name]:target.value })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title <input type="text" placeholder="title" value={bloginfo.title} name="title" id="title" onChange={handleBlog} />
      </div>
      <div>
          author <input type="text" placeholder="author" value={bloginfo.author} name="author" id="author" onChange={handleBlog} />
      </div>
      <div>
          url <input type="text" placeholder="url" value={bloginfo.url} name="url" id="url" onChange={handleBlog}/>
      </div>
      <button type="submit" id="create">create</button>
    </form>
  )
}

export default BlogForm