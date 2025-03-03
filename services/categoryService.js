const Category = require('../models/categories');
const CustomError = require('../lib/customError');
const Enum = require('../config/Enum');

async function getAllCategories() {
    return await Category.find();
}

async function createCategory(body) {
    try{
    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Vadlidation error', 'Name is required');
    let category = new Category({
        name: body.name,
        // is_active: true,
        // created_by: req.user?.id
    });
    
    await category.save();
    return category;

    } catch {
        res.status(error.code || Enum.HTTP_CODES.INT_SERVER_ERROR).json(ResponseHandler.error(error));
    }
}


module.exports = {
    getAllCategories,
    createCategory
}


