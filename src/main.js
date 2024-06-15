import { EmailSender, UserService } from "./UserService.js"

const [binPath, filePath, name, age] = process.argv

const userService = new UserService(new EmailSender())

if (!name || !age) {
  userService.sendWelcomeEmail()
} else {
  userService.register(name, age)
}
