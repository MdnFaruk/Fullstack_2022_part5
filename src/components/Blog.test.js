import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'Blog test',
  author: 'Dev',
  url: 'http://blog.com',
  likes: 5,
  user: {
    username: 'mdfar',
    name: 'faruk',
  },
}

test('renders only blog\'s title and author', () => {

  const { container } = render(<Blog blog={blog} />)
  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(`${blog.title} ${blog.author}`)
})

test('clicking the button shows url and number of likes', async () => {
  const { container } = render(<Blog blog={blog} />)

  const url = container.querySelector('#url')
  const likes = container.querySelector('#likes')
  const button = screen.getByText('view')
  userEvent.click(button)

  expect(url).toHaveTextContent('http://blog.com')
  expect(likes).toHaveTextContent('5')
})

test('like button is clicked twice', async () => {
  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} handleLike={mockHandler} />
  )

  const button = screen.getByText('like')
  userEvent.click(button)
  userEvent.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})