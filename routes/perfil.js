const PostPerfil = require("../database/databaseModelPerfil")
const express = require("express");
const router = express.Router();

//teste de retorno das rotas
router.get("/perfil", (req, res) => {
    PostPerfil.findOne({
        where: {
            vitorias:'102030'
        }
    }).then(function(vitorias){
        res.render('perfil', {
            vitorias
        });
        
    }); 
    console.log('foi') 
});

router.post("/perfil"), async (req, res)=>{  
}

module.exports = router;