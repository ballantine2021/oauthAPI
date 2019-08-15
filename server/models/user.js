const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');
const Model = Sequelize.Model;
const sequelize = new Sequelize('fbauth','turing','turing',
{host: 'localhost', dialect: 'mysql'});

class User extends Model {}
User.init({
    email: {
        type: Sequelize.STRING(100),
    },
    password: {
        type: Sequelize.STRING(400),
    }

}, {
    sequelize,
    modelName: 'user'
});

User.sync({force : true});

User.beforeCreate(async user => {
    try {
        const salt = await bcrypt.genSalt(10);
        // console.log('/salt', salt);
        user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
        next(error);
    }
});

User.prototype.isValidPassword = async function(newPassword){
    try {
        bcrypt.compare('tsengel')
    } catch (error){
        throw new Error(error);
    }

}

module.exports = User;