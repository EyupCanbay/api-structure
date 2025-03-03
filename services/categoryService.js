const Category = require('../models/categories');
const CustomError = require('../lib/customError');
const Enum = require('../config/Enum');
const ResponseHandler = require('../lib/responseHandler.js')

async function getAllCategories() {
    return await Category.find();
}

async function createCategory(body) {
    try{
    let category = new Category({
        name: body.name,
    });
    
    await category.save();
    return category;

    } catch {
        res.status(error.code || Enum.HTTP_CODES.INT_SERVER_ERROR).json(ResponseHandler.error(error));
    }
}

async function updateCategory(category_id, body) {
    try{
        let category = await Category.findById({_id: category_id})
        category.name = body.name || category.name;
        category.is_active = body.is_active || category.is_active;
        return await Category.findByIdAndUpdate({_id: category_id}, category);

    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

async function deleteCategory(category_id) {
    try{
        return await Category.findByIdAndDelete({_id: category_id});
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
}


