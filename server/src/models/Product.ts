import Sequelize from 'sequelize'
module.exports = (seqelize:any) => {
    const Product = seqelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        qr:{type: Sequelize.STRING, allowNull: true},
        title:{type: Sequelize.STRING, allowNull: true},
        description: {type: Sequelize.STRING, defaultValue: " ", allowNull: true},
        user_id: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: true},
        vote_qt: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: true},
        rating: {type: Sequelize.INTEGER, defaultValue: 0, allowNull: true},
    });
    return Product;
}
