import { response } from "express";
import { Types } from 'mongoose';
import { User } from "../../models/user.js";
import { Product } from "../../models/product.js";
import { Category } from "../../models/category.js";


const colectionsEnabled = [
    'users',
    'categories',
    'products',
    'roles'
];


const searchUsers = async( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );

    if( isMongoID ){
        const data = await User.findById( term );

        return res.json({
            results: ( data ) ? [ data ] : []
        });

    }

    const regex = new RegExp(term, 'i');

    const data = await User.find({ 
        $or: [{ name: regex }, { email: regex }],
        $and: [{ is_state: true }]
    });

    res.json({
        results: data
    })
}


const searchCategories = async( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );

    if( isMongoID ){
        const data = await Category.findById( term );

        return res.json({
            results: ( data ) ? [ data ] : []
        });

    }

    const regex = new RegExp(term, 'i');

    const data = await Category.find({ name: regex, is_state: true });

    res.json({
        results: data
    })
}



const searchProducts = async( term = '', res = response ) => {
    
    const isMongoID = Types.ObjectId.isValid( term );

    if( isMongoID ){
        const data = await Product.findById( term ).populate('category', 'name');

        return res.json({
            results: ( data ) ? [ data ] : []
        });

    }

    const regex = new RegExp(term, 'i');

    const data = await Product.find({ name: regex, is_state: true })
                                .populate('category', 'name');

    res.json({
        results: data
    })
}




export const searchListController = async(req, res = response) => {

    
    const { collection, term } = req.params;


    if( !colectionsEnabled.includes( collection )){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${ colectionsEnabled }`
        });
    }


    switch (collection) {
        
        case 'users':
            searchUsers(term, res)
        break;
        case 'categories':
            searchCategories(term, res)
        break;
        case 'products':
            searchProducts(term, res)
        break;

        default:
            res.status(500).json({
                msg: 'Se le olvido hacer esta búsqueda'
            })

    }

}