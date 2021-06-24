import React from 'react'
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { Counter } from "./"
import "@testing-library/jest-dom"

describe("Counter", () => {
  afterEach(() => {
    cleanup()
  })
  test("render", () => {
    const { asFragment } = render(<Counter />)
    expect(asFragment()).toMatchSnapshot()
  })
  test("click:count", () => {
    render(<Counter />)
    const button = screen.getByText("Increment")
    fireEvent.click(button)
    fireEvent.click(button)
    screen.getByText("Count: 2")
  })
})
