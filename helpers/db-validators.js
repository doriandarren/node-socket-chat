import { Category } from "../models/category.js";
import { Product } from "../models/product.js";
import { Role } from "../models/role.js";
import { User } from "../models/user.js";


export const isRoleValid = async(role = '') => {
    const isRole = await Role.findOne({ role });
    if( !isRole ){
        throw new Error(`El rol ${role} no está registrado en la DB`);            
    }
}



export const isEmailExist = async( email = '') => {
    const existeEmail = await User.findOne({ email });
    if( existeEmail ) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}


export const isUserExistById = async( id) => {
    const duplicated = await User.findById(id);
    if( !duplicated ) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}


export const isCategoryExistById = async(id) => {
    const duplicated = await Category.findById(id);
    if( !duplicated ) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}


export const isProductExistById = async(id) => {
    const duplicated = await Product.findById(id);
    if( !duplicated ) {
        throw new Error(`El id: ${id} no está registrado`);
    }
}



export const collectionsAllowed = async(collection = '', collections = []) => {

    const included = collections.includes( collection );

    if( !included ){
        throw new Error(`La coleccion ${ collection } no es permitida - ${ collections }`);
    }

    return true;
    
}

    