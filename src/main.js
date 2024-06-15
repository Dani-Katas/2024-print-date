import { UserService } from "./UserService.js"

const [binPath, filePath, name, age] = process.argv

const userService = new UserService()

if (!name || !age) {
  userService.list()
} else {
  userService.register(name, age)
}
