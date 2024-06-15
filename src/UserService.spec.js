import { describe, it, expect } from "vitest"
import { UserService } from "./UserService.js"

describe("UserService", () => {
  it("sends an email to all the users", () => {
    const userService = new UserService()

    userService.sendWelcomeEmail()
  })
})
