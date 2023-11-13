import { DataTypes, Sequelize } from "sequelize"

const model = (sequelize: Sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.BIGINT,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATE
        }
    })

    const ContactInfo = sequelize.define("ContactInfo", {
        id: {
            type: DataTypes.BIGINT,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        freezeTableName: true
    })

    User.hasOne(ContactInfo, {
        foreignKey: {
        //   type: DataTypes.BIGINT,
          allowNull: false
        }
    });

    ContactInfo.belongsTo(User)

    sequelize.sync({ alter: true })
}



export default model