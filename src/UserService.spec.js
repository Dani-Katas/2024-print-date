import { describe, it, expect } from "vitest"
import { EmailSender, UserRepository, UserService } from "./UserService.js"

class EmailSenderSpy extends EmailSender {
  sentEmails = []

  send(to, subject, text) {
    this.sentEmails.push({ to, subject, text })
  }
}

class UserRepositoryStub extends UserRepository {
  list() {
    return [
      { name: "Alice", age: 25, createdAt: new Date() },
      { name: "Bob", age: 30, createdAt: new Date() },
      { name: "Charlie", age: 35, createdAt: new Date() },
      { name: "David", age: 40, createdAt: new Date() },
      { name: "Eve", age: 45, createdAt: new Date() },
    ]
  }
}

describe("UserService", () => {
  it("sends an email to all the users", () => {
    const emailSender = new EmailSenderSpy()
    const userRepository = new UserRepositoryStub()
    const userService = new UserService(emailSender, userRepository)

    userService.sendWelcomeEmail()

    expect(emailSender.sentEmails).toHaveLength(5)
  })
})
