let config = {
    server_port : '1010',
    enable_profiler : false,
    session : {
        secret: '02#04#08',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    },
    mysql_connection : {
        host: "localhost",
        user: "root",
        password: "",
        database: "js_express_db",
        port: 3306
    }
};

module.exports = config;