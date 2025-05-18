import { User } from "../../models/user.js";



export const userListController = async(req = request, res= response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { is_state: true };

    const [ total, data ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip( Number(from) )
            .limit( Number(limit) )
    ]);

    res.json({
        total,
        data
    });
}