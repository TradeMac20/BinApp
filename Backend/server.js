const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));

const pool = require('./config/db');
pool.query('SELECT NOW()', (err,res)=>{
    if(err) {
        console.error('Database connection error: ', err)
    } else { 
        console.log('Database connected:', res.rows[0])
    }
})