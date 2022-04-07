import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './CreateBlog'
import userEvent from '@testing-library/user-event'

test.only('<BlogForm /> updates parent state and calls onSubmit', () => {
  const creatingBlog = jest.fn()

  render(<BlogForm creatingBlog={creatingBlog} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const sendButton = screen.getByText('create')

  userEvent.type(title, 'React basic' )
  userEvent.type(author, 'faruk' )
  userEvent.type(url, 'http://blog.com' )

  userEvent.click(sendButton)

  expect(creatingBlog.mock.calls).toHaveLength(1)
  expect(creatingBlog.mock.calls[0][0].title).toBe('React basic' )
  expect(creatingBlog.mock.calls[0][0].author).toBe('faruk' )
  expect(creatingBlog.mock.calls[0][0].url).toBe('http://blog.com' )
})