import * as fs from "fs"

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

  list() {
    const users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

    console.log(users)
  }
}