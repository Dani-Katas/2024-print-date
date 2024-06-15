import { describe, it, expect } from "vitest"
import { EmailSender, Logger, UserRepository, UserService } from "./UserService.js"

class EmailSenderSpy extends EmailSender {
  sentEmails = []

  send(to, subject, text) {
    this.sentEmails.push({ to, subject, text })
  }
}

class TestableUserRepository extends UserRepository {
  users = []

  // stub
  list() {
    return [
      { name: "Alice", age: 25, createdAt: new Date() },
      { name: "Bob", age: 30, createdAt: new Date() },
      { name: "Charlie", age: 35, createdAt: new Date() },
      { name: "David", age: 40, createdAt: new Date() },
      { name: "Eve", age: 45, createdAt: new Date() },
    ]
  }

  // spy
  save(user) {
    this.users.push(user)
  }
}

class UserRepositoryFake extends UserRepository {
  users = []

  list() {
    return this.users
  }

  save(user) {
    this.users.push(user)
  }
}

class LoggerDummy extends Logger {
  log() {}
}

describe("UserService", () => {
  describe("sendWelcomeEmail", () => {
    it("sends an email to all the users", () => {
      const emailSender = new EmailSenderSpy()
      const userRepository = new TestableUserRepository()
      const logger = new LoggerDummy()
      const userService = new UserService(emailSender, userRepository, logger)

      userService.sendWelcomeEmail()

      expect(emailSender.sentEmails).toHaveLength(5)
    })
  })

  describe("register", () => {
    it("registers a new user", () => {
      const emailSender = new EmailSenderSpy()
      const userRepository = new TestableUserRepository()
      const logger = new LoggerDummy()
      const userService = new UserService(emailSender, userRepository, logger)

      userService.register("Pepe", "25")

      expect(userRepository.users).toHaveLength(1)
    })
  })

  describe("all the behavior", () => {
    it("works", () => {
      const emailSender = new EmailSenderSpy()
      const userRepository = new UserRepositoryFake()
      const logger = new LoggerDummy()
      const userService = new UserService(emailSender, userRepository, logger)

      userService.register("Pepe", "25")
      userService.register("Maria", "25")
      userService.register("Paco", "25")
      userService.sendWelcomeEmail()

      expect(emailSender.sentEmails).toHaveLength(3)
    })
  })
})
