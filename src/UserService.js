import * as fs from "fs"
import { nodemailer } from "./nodemailer.js"

export class UserService {
  register(name, age) {
    const user = {
      name,
      age: parseInt(age),
      createdAt: new Date(),
    }

    const users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

    const alreadyExists = users.some((savedUser) => savedUser.name === name)

    if (alreadyExists) {
      throw new Error("User already exists")
    }

    users.push(user)

    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2))
  }

  sendWelcomeEmail() {
    const users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

    for (const user of users) {
      nodemailer(user.name, "Welcome!", "Welcome to our platform!")
    }
  }
}
