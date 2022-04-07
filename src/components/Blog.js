import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleRemove }) => {
  const [show, setShow] = useState(true)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>{blog.title} {blog.author}
        <button onClick={() => setShow(!show)} >{show ? 'view' : 'hide'}</button>
      </div>
      <div style={{ display: show ? 'none' : '' }}>
        <div id='url'>{blog.url}</div>
        <div id='likes'>{blog.likes} <button onClick={() => handleLike(blog)} >like</button> </div>
        <div>{blog.user.name}</div>
        <button style={{ backgroundColor:'lightblue' }}onClick={() => handleRemove(blog)} >remove</button>
      </div>

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
}

export default Blog