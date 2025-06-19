// controllers/authController.js

const pool = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const registerUser = async(req, res)=> {
    const { username, email, password, role, has_seen_modal } = req.body;

    try {
        //Check if user exists
        const existing = await pool.query('SELECT * FROM users WHERE email=$1', [email]);
        if (existing.rows.length > 0) return res.status(400).json({message: 'User already exists'});

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Insert user
        const newUser = await pool.query('INSERT INTO users (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *', [username, email, hashedPassword, role, has_seen_modal]);

        res.status(201).json({user: newUser.rows[0] });
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Server error: ',err});
       }
};

const  loginUser = async (req,res)=>{
    const {email, password} = req.body;

    try {
        const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userRes.rows.length ===0) return res.status(400).json({message: 'Invalid credentials'});
        
        const user = userRes.rows[0];
        const isMatch =await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET,  { expiresIn: '1h' });
        console.log(token);

        res.json({
            user: {id: user.id, username: user.username, email: user.email},
            token
        });  
    } catch (err){
        res.status(500).json({error: 'Server error',err})

    }
};


module.exports = { registerUser,loginUser}
