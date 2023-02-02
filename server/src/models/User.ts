import Sequelize from 'sequelize';
module.exports = (seqelize:any) => {
    const User = seqelize.define('user', {
            id: {
               type: Sequelize.INTEGER,
               autoIncrement: true,
               primaryKey: true,
               allowNull: false
            },
            login:{type: Sequelize.STRING, allowNull: true},
            password:{type: Sequelize.STRING, allowNull: true},
            email:{type: Sequelize.STRING, allowNull: true},
            is_activated: {type: Sequelize.BOOLEAN, defaultValue: false, allowNull: true},
            role: {type: Sequelize.STRING, defaultValue: "USER", allowNull: true},
            activated_link:{type: Sequelize.STRING, allowNull: true},
            vote_qt: {type: Sequelize.INTEGER, allowNull: true},
            name: {type: Sequelize.STRING, allowNull: true},
            img: {type: Sequelize.STRING, allowNull: true},
            rating: {type: Sequelize.INTEGER, allowNull: true},
        },

    );
    return User;
}
