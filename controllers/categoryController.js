const Category = require('../models/categories');
const categoryService = require('../services/categoryService');
const ResponseHandler = require('../lib/responseHandler.js')


async function getAllCategories(req,res,next){
    try{
        let categories = await categoryService.getAllCategories();
        res.status(200).json(ResponseHandler.success('Categories retrieved successfully', categories));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
} 

module.exports = {
    getAllCategories
}