import pool from "../../db"
import queries from "./queries"
import { Request, Response, NextFunction } from "express"

const getStudents = (req: Request, res: Response, next: NextFunction) => {
    pool.query(queries.getStudents, (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const addStudent = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, age, dob } = req.body

    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (results.rows.length) 
        {
            res.send("Email already exists.")
        }

        pool.query(queries.addStudent, [name, email, age, dob], (error, results) => {
            if (error) throw error
            res.status(201).send("Student Created Successfully")
        })
    })
}

const getStudentById = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    pool.query(queries.getStudentById, [id], (error, results) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
}

const updateStudent = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)
    const { name } = req.body

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (!results.rows.length)
        {
            res.send("Student does not exist")
        }
        
        pool.query(queries.updateStudent, [name, id], (error, results) => {
            if (error) throw error
            res.status(200).send("Student updated successfully")
        })
    })
}

const removeStudent = (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id)

    pool.query(queries.getStudentById, [id], (error, results) => {
        if (!results.rows.length)
        {
            res.send("Student does not exist")
        }

        pool.query(queries.removeStudent, [id], (error, results) => {
            if (error) throw error
            res.status(200).send("Student removed sucessfully")
        })
    })
}

export default {
    getStudents,
    addStudent,
    getStudentById,
    removeStudent,
    updateStudent
}