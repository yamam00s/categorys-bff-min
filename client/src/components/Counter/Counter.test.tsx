import React from 'react'
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react"
import { AsyncCounter } from "./"
import "@testing-library/jest-dom"

describe("AsyncCounter", () => {
  afterEach(() => {
    cleanup()
  })
  // test("render", () => {
  //   const { asFragment } = render(<Counter />)
  //   expect(asFragment()).toMatchSnapshot()
  // })
  // test("click:count", () => {
  //   render(<Counter />)
  //   const button = screen.getByText("Increment")
  //   fireEvent.click(button)
  //   fireEvent.click(button)
  //   screen.getByText("Count: 2")
  // })
  describe("click:count: カウントアップ", () => {
    test("ボタン押下1秒後は1カウントアップ", () => {
      jest.useFakeTimers()
      render(<AsyncCounter />)
      const button = screen.getByText("AsyncIncrement") as HTMLButtonElement
      fireEvent.click(button)
      act(() => {
        jest.runAllTimers()
      })
      screen.getByText("AsyncCount: 1")
      jest.useRealTimers()
    })
  })

  describe("click:count: ボタン活性、非活性", () => {
    test("ボタン押下直後はボタンが非活性", () => {
      render(<AsyncCounter />)
      const button = screen.getByText("AsyncIncrement") as HTMLButtonElement
      fireEvent.click(button)
      expect(button.disabled).toBe(true)
    })

    test("ボタン押下1秒後はボタン活性", () => {
      jest.useFakeTimers()
      render(<AsyncCounter />)
      const button = screen.getByText("AsyncIncrement") as HTMLButtonElement
      fireEvent.click(button)
      act(() => {
        jest.runAllTimers()
      })
      expect(button.disabled).toBe(false)
      jest.useRealTimers()
    })
  })
})
