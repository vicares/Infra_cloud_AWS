'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config', 'config.json');
const config = require(configPath)[env];

const db = {};

// Inicializa a conexão do Sequelize
const sequelize = config.use_env_variable
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

try {
  sequelize.authenticate();
  console.log("📡 Conectado ao banco de dados com sucesso!");
} catch (error) {
  console.error("❌ Erro ao conectar ao banco de dados:", error);
}

// Carrega os modelos dinamicamente
fs.readdirSync(__dirname)
  .filter(file => file.endsWith('.js') && file !== basename && !file.endsWith('.test.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Configura associações entre os modelos
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Exporta apenas os modelos e a conexão do Sequelize
module.exports = { sequelize, ...db };
