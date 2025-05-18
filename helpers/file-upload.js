import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const fileUpload = (files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '') => {
    

    return new Promise( (resolve, reject) => {


        const { archivo } = files;
        const shortenedName = archivo.name.split('.');
        const extension = shortenedName[ shortenedName.length - 1 ];
        

        if( !validExtensions.includes( extension )){
            return reject(`La extension ${ extension } no esta permitida - ${ validExtensions }`);
        }


        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', folder, nameTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                return reject(err);
            }
            resolve(uploadPath);
        });

    });

    

}