module.exports = {

    sample_get : function(req, res){

        console.log(req.params.name);

        res.json({

            'hello' : 'sumitazsdgasgd',
            'req' : req.params.id

        });

    }
}