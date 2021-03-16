import mongoose from 'mongoose';

class DataBase{
    constructor() {
        this.mongoDataBase();
    }
    mongoDataBase() {
        mongoose.connect('mongodb://localhost/alex', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }).then(() => {
              console.log("Conexão com MongoDB realizada com sucesso!");
          }).catch((erro) => {
              console.log("Erro: Conexão com o MongoDB não foi realizada com sucesso! " + erro);
          });
    }
}

export default new DataBase();