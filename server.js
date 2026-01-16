const express=require('express')
const sequelize=require('./database')
const bcrypt=require('bcrypt')
const User=require('./models/User')
const userRoutes=require('./routes/userRoutes')

const app=express()

app.use(express.json());

(async()=>{
try {
    await sequelize.sync({force:true})//mindig újra csinálja a táblákat(törlödik a tartalom)
    console.log("db synced")

    //teszt userek
    await User.create({username:'admin',password:await bcrypt.hash('adminpass',10),role:'admin'})
    await User.create({username:'user',password:await bcrypt.hash('userpass',10),role:'user'})

    app.use('/api/users',userRoutes)

    app.listen(3000,()=>{
        console.log("server is running")
    })
} catch (error) {
    console.error(error)
}
})()