let config = {};

config.server_port = '1010';
config.session = {
    secret: '02#04#08',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
};
config.mysql_connection = {
    host: "localhost",
    user: "root",
    password: "",
    database: "js_express_db",
    port: 3306
}

module.exports = config;