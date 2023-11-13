import { Router } from "express"
import controller from "./controller"

const router = Router()

router.get('/', controller.getStudents)
router.post("/", controller.addStudent)
router.get("/:id", controller.getStudentById)
router.put("/:id", controller.updateStudent)
router.delete("/:id", controller.removeStudent)

export default router