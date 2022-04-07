import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/CreateBlog'
import Toggleable from './components/Toggleable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const blogRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUserBlog')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedInUserBlog', JSON.stringify(user))

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setIsError(true)
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUserBlog') //window.localStorage.clear()
    setUser(null)
  }

  const handleUsername = ({ target }) => {
    setUsername(target.value)
  }
  const handlePassword = ({ target }) => {
    setPassword(target.value)
  }
  const addBlog = async blogObject => {
    blogRef.current.visibilityToggle()
    try {
      const resData = await blogService.create(blogObject)
      setBlogs( [...blogs, resData] )
      setIsError(false)
      setMessage(`a new blog ${resData.title} by ${resData.author}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)

    } catch (error) {
      setMessage(error.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const updateLike = async updateObject => {
    try {
      updateObject.likes += 1
      const resData = await blogService.update(updateObject)
      setBlogs( [...blogs, resData] )
      setIsError(false)
      setMessage('updated likes')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      setMessage(error.response.data.error)
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async newObject => {
    try {
      if(window.confirm(`Remove blog ${newObject.title} by ${newObject.author}`)) {
        await blogService.remove(newObject.id)
        setBlogs(blogs.filter(blog => blog.id !== newObject.id))
      }
    } catch (error) {
      setMessage(error.response.statusText)
      setIsError(true)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }

  }

  const Header = ({ text }) => <h2>{text}</h2>

  return (
    <div>

      <Notification message={message} isError={isError}/>
      {user === null ?
        <div>
          <Toggleable buttonLabel1="login" buttonLabel2="cancel">
            <Header text = {'log in to application'}/>
            <LoginForm {...{ username, password, handleLogin, handleUsername, handlePassword }}/>
          </Toggleable>
          {blogs.sort((first,second) => second.likes - first.likes)
            .map(blog => <Blog key={blog.id} blog={blog} handleLike={updateLike} handleRemove={deleteBlog}/>)}
        </div>
        :
        <div>
          <Header text = {'blogs'}/>
          <p>{user.name} logged in <button onClick={handleLogout} >logout</button></p>
          <Toggleable buttonLabel1="create blog" buttonLabel2="cancel" ref={blogRef}>
            <Header text = {'create new'}/>
            <BlogForm creatingBlog={addBlog} />
          </Toggleable>
          {blogs.sort((first,second) => second.likes - first.likes)
            .map(blog => <Blog key={blog.id} blog={blog} handleLike={updateLike} handleRemove={deleteBlog}/>)}
        </div>
      }

    </div>
  )
}

export default App