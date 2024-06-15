import { describe, it, expect } from "vitest"
import { EmailSender, Logger, UserRepository, UserService } from "./UserService.js"

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

class LoggerDummy extends Logger {
  log() {}
}

describe("UserService", () => {
  it("sends an email to all the users", () => {
    const emailSender = new EmailSenderSpy()
    const userRepository = new UserRepositoryStub()
    const logger = new LoggerDummy()
    const userService = new UserService(emailSender, userRepository, logger)

    userService.sendWelcomeEmail()

    expect(emailSender.sentEmails).toHaveLength(5)
  })
})
