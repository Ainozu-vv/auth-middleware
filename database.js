const {Sequelize} = require("sequelize")

const sequelize=new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
});

(async ()=>{
    try {
        await sequelize.authenticate()
        console.log("DB success")
    } catch (error) {
        console.error(error)
    }
})();

module.exports=sequelize