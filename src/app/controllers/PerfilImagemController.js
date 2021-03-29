import fs from 'fs';

class PerfilImagemController{
    async update(require, response){
        return response.json({
            error: false,
            message: "Upload img user"
        });
    }
};

export default new PerfilImagemController();