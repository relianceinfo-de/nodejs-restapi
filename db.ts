import Pool from "pg"

const pool = new Pool.Pool({
    user: "postgres",
    host: "localhost",
    database: "students",
    password: "Password@123",
    port: 5432,
})

export default pool