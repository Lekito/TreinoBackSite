import multer from "multer";
import crypton from 'crypto';
import { extname } from 'path';

export default{
    storage: multer.diskStorage({
        destination: function(require, file, cb){
            cb(null, 'tmp/uploads/users')
        },
        filename: (require, file, cb) => {
            crypton.randomBytes(16, (err, response) => {
                if(err) return cb(err);

                return cb(null, response.toString('hex') + extname(file.originalname))
            });
        }
    }),
}