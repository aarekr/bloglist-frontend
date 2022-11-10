import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import Togglable from './Togglable'
import UusiBlogForm from './UusiBlogForm'

describe('Blog title, author, URL, likes', () => {
  test('renders blog title', () => {
    const blog = {
      title: 'uusiBlogForm luotu'
    }
    render(<Blog blog={blog} />)
    const element = screen.getByText('uusiBlogForm luotu')
    expect(element).toBeDefined()
  })
})

describe('<Togglable />', () => {
  let container
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel="view">
        <div className="testDiv">togglable content</div>
      </Togglable>
    ).container
  })

  test('renders its children', () => {
    screen.getByText('togglable content')
  })

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the view button, children are displayed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const div = container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('toggled content can bew closed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const closeButton = screen.getByText('cancel')
    await user.click(closeButton)
    const div = container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('<UusiBlogForm /> inputs title-author-url and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()
    render(<UusiBlogForm createBlog={createBlog} />)
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')
    await user.type(inputs[0], 'testing a form')
    await user.type(inputs[1], 'testing author')
    await user.type(inputs[2], 'testing url')
    await user.click(sendButton)
    expect(createBlog.mock.calls).toHaveLength(1)
    console.log('createBlog.mock.calls:', createBlog.mock.calls[0][0])
    expect(createBlog.mock.calls[0][0]['title']).toBe('testing a form')
    expect(createBlog.mock.calls[0][0]['author']).toBe('testing author')
    expect(createBlog.mock.calls[0][0]['url']).toBe('testing url')
  })
})