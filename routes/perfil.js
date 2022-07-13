const express = require("express");
const router = express.Router();
const db = require("../database/dataBaseModel");

router.get("/perfil", (req, res) => {
    db.PostInfos.findAll().then((userInfo)=>{
        res.render("perfil", {userInfo: userInfo})
    })
    
    
});

module.exports = router