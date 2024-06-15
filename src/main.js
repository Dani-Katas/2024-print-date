import * as fs from "fs"

const [binPath, filePath, name, age] = process.argv

if (!name || !age) {
  const users = JSON.parse(fs.readFileSync("./users.json", "utf8"))

  console.log(users)
  process.exit(0)
}

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
