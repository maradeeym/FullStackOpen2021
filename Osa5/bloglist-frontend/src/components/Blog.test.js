import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe("Testing Blog component", () => {
  const testBlog = {
    title: "Pekan Pyörätuoli",
    author: "Jim Carrey",
    url: "http://möhömaha.com",
    likes: 666,
    user: {
      username: "serkku",
      name: "kaukoputki",
    },
  }

  let component

  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog blog={testBlog} blogUpdate={mockHandler} />)
  })

  test("renders blogs and author, but not likes and username", () => {
    expect(component.container).toHaveTextContent(testBlog.title)
    expect(component.container).toHaveTextContent(testBlog.author)
    expect(component.container.user).toBeUndefined()
    expect(component.container.likes).toBeUndefined()
  })

  test("shows likes and url when view is clicked", () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')

    expect(component.container).toHaveTextContent(testBlog.url)
    expect(component.container).toHaveTextContent(testBlog.likes)
  })

  test("if like button is clicked twice, props are called twice", () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})