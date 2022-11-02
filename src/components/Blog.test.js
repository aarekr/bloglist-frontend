import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title', () => {
  const blog = {
    title: 'uusiBlogForm luotu'
  }
  render(<Blog blog={blog} />)
  const element = screen.getByText('uusiBlogForm luotu')
  expect(element).toBeDefined()
})