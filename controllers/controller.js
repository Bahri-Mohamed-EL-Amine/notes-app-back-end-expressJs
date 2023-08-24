const pool = require('../db/connect')

const createUser  =async (req,res)=>{
    const { email,username,password} = req.params
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query('select email from users where email = ?',[email])
        if(rows.length > 0){
            return res.status(409).json({error:"User already exist"})
        }
        else{
            const[result] = await connection.query('insert into users(username,email,password) values(?,?,?)',[username,email,password])
            return res.json(result)
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:"Internal server error"})
    }
}
const getUserInfos =async (req,res)=>{
    const{email,password} = req.params
    try{
        const connection = await pool.getConnection()
        const [rows] = await connection.query('select * from users where email = ? and password = ?',[email,password])
        if(rows.length > 0){
            res.json(rows[0])
        }
        else{
            res.status(404).json({ error: "User not found"})
        }
    }
    catch(e){
        console.log(e)
        return res.status(500).json({error:"Internal server error"})
    }
}

const getNotesByUserId =async (req,res)=>{
    const { user_id } = req.params
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query('select * from notes where user_id = ?', [user_id])
        if (rows.length > 0) {
            res.json(rows[0])
        }
        else {
            res.status(404).json({ error: "Notes not found" })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })
    }
}

const createNoteByUserId =async (req,res)=>{
    const { user_id } = req.params
    const{note,categorie,created_at} = req.body
    try {
        const connection = await pool.getConnection()
        const [result] = await connection.query('insert into notes(user_id,note,categorie,created_at) values(?,?,?,?)',[user_id,note,categorie,created_at])
        res.json(result)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })
    }
}
const getCategoriesByUserId = async (req,res)=>{
    const { user_id } = req.params
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query('select * from categories where user_id = ?', [user_id])
        if (rows.length > 0) {
            res.json(rows[0])
        }
        else {
            res.status(404).json({ error: "Categories not found" })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })
    }
}
const getNotesByCategorie = async (req,res)=>{
    const { user_id ,categorie} = req.params
    try {
        const connection = await pool.getConnection()
        const [rows] = await connection.query('select * from notes where user_id = ? and categorie = ?', [user_id,categorie])
        if (rows.length > 0) {
            res.json(rows[0])
        }
        else {
            res.status(404).json({ error: "Notes not found" })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })
    }
}
const createCategorieByUserId =async (req,res)=>{
    const { user_id } = req.params
    const{categorie} = req.body
    try {
        const connection = await pool.getConnection()
        const [result] = await connection.query('insert into categories(user_id,categorie) values(?,?)',[user_id,categorie])
        res.json(result)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ error: "Internal server error" })
    }
}
module.exports = {
    createCategorieByUserId,
    getNotesByUserId,
    createNoteByUserId,
    createUser,
    getUserInfos,
    getNotesByCategorie,
    getCategoriesByUserId
}