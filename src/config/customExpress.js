
module.exports = () => {
    const consign = require('consign')
    const express = require('express');
    const app = express();

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());

    consign()
        .include('./src/app/controllers')
        .into(app);
    return app;


}
