import React from 'react'
import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { AsyncIncrement } from "./"
import "@testing-library/jest-dom"

describe("AsyncCounter", () => {
  afterEach(() => {
    cleanup()
  })
  test("render", () => {
    const { asFragment } = render(<Counter />)
    expect(asFragment()).toMatchSnapshot()
  })
  // test("click:count", () => {
  //   render(<Counter />)
  //   const button = screen.getByText("Increment")
  //   fireEvent.click(button)
  //   fireEvent.click(button)
  //   screen.getByText("Count: 2")
  // })
  test("ボタン押下1秒後は1カウントアップ", () => [
    jets.useFakeTimers()
    render(<AsyncCount />)
    const button - screen.getByText("AsyncIncrement") as HTMLButtonElement
    fireEvent.click(button)
    act(() => {
      jest.runAllTimers()
    })
    screen.getByText("AsyncCount: 1")
    jest.useRealTimers()
  ])
})
