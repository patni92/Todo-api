var passwordHash = require('password-hash');
var _ = require('underscore');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define("user", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password_hash: {
            type: DataTypes.STRING,
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [7,100]
            },
            set: function (value) {
                var hahsedPassword = passwordHash.generate(value);
                this.setDataValue("password", value);
                this.setDataValue("password_hash", hahsedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if(typeof user.email === "string") {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        instanceMethods:  {
            toPublicJSON: function () {
                var json = this.toJSON();
                return _.pick(json, "id", "email", "createdAt", "updatedAt")
            }
        }
    });
};
