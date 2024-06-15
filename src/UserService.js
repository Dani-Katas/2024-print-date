import * as fs from "fs"
import { nodemailer } from "./nodemailer.js"

export class EmailSender {
  send(to, subject, text) {
    nodemailer(to, subject, text)
  }
}

export class UserRepository {
  list() {
    return JSON.parse(fs.readFileSync("./users.json", "utf8"))
  }

  save(user) {
    const users = this.list()
    users.push(user)
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2))
  }
}

export class Logger {
  log(message) {
    console.log(message)
  }
}

export class UserService {
  constructor(emailSender, userRepository, logger) {
    this.emailSender = emailSender
    this.userRepository = userRepository
    this.logger = logger
  }

  register(name, age) {
    const user = {
      name,
      age: parseInt(age),
      createdAt: new Date(),
    }

    const users = this.userRepository.list()

    const alreadyExists = users.some((savedUser) => savedUser.name === name)

    if (alreadyExists) {
      throw new Error("User already exists")
    }

    this.userRepository.save(user)
  }

  sendWelcomeEmail() {
    const users = this.userRepository.list()

    this.logger.log(users)

    for (const user of users) {
      this.emailSender.send(user.name, "Welcome!", "Welcome to our platform!")
    }
  }
}
