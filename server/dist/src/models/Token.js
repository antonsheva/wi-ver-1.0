const Sequelize = require('sequelize');
module.exports = (seqelize) => {
    const Token = seqelize.define('token', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        refresh_token: { type: Sequelize.STRING, defaultValue: " " },
        user_id: { type: Sequelize.INTEGER, defaultValue: 0 },
    });
    return Token;
};
//# sourceMappingURL=Token.js.map