import { response } from "express";
import { Category } from "../../models/category.js";


export const categoryListController = async(req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { is_state: true };

    const [ total, data ] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query)
            .populate('user', 'name')
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        data
    });

}