import { renderHook } from "@testing-library/react-hooks"
import { useInitialAnalytics } from './useInitialAnalytics'
import * as analyticsModule from "../libs/analytics"

const spiedSetStatus = jest.spyOn(analyticsModule, "setStatus")
const spiedSendPageView = jest.spyOn(analyticsModule, "setStatus")

test("useInitialAnalytics 初回実行", () => {
  renderHook(() => useInitialAnalytics({ id: "foo", role: "bar" }))
  expect(spiedSetStatus).toBeCalledWith({ id: "foo", role: "bar" })
  expect(spiedSendPageView).toBeCalled()
})