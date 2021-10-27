const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING,
    },
    countryId:{
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true
    },
    flag:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      },
      capital:{
        type: DataTypes.STRING,
        allowNull: false
      },
      subregion:{
        type: DataTypes.STRING
      },
      area:{
        type: DataTypes.FLOAT // in km2
      },
      population:{
        type: DataTypes.INTEGER
      }
  },
  {
    timestamps: false 
  });
};
