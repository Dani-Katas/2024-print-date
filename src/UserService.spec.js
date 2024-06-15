import { describe, it, expect } from "vitest"
import { EmailSender, UserRepository, UserService } from "./UserService.js"

class TestableEmailSender extends EmailSender {
  sentEmails = []

  send(to, subject, text) {
    this.sentEmails.push({ to, subject, text })
  }
}

describe("UserService", () => {
  it("sends an email to all the users", () => {
    const emailSender = new TestableEmailSender()
    const userService = new UserService(emailSender, new UserRepository())

    userService.sendWelcomeEmail()

    expect(emailSender.sentEmails).toHaveLength(5)
  })
})
