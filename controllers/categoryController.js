const Category = require('../models/categories');
const categoryService = require('../services/categoryService');
const ResponseHandler = require('../lib/responseHandler.js');
const CustomError = require('../lib/customError.js');
const Enum = require('../config/Enum.js');



async function getAllCategories(req,res,next){
    try{    
        
        let categories = await categoryService.getAllCategories();
        res.status(200).json(ResponseHandler.success('Categories retrieved successfully', categories));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
} 

async function createCategory(req,res,next){
    const body = req.body;
    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Vadlidation error', 'Name is required');
    try{
        const category = await categoryService.createCategory(body);
        res.status(201).json(ResponseHandler.success('Category created successfully', category)); 
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

async function updateCategory(req,res,next){
    const category_id = req.params.category_id;
    if(!category_id) throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, 'Not Found', 'Category not found');
    const body = req.body;
    if(!body.name) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Validation error', 'id is field must be field');
    
    try{
        const category = await categoryService.updateCategory(category_id, body);
        res.status(200).json(ResponseHandler.success('Category updated successfully', category)); 
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }

}

module.exports = {
    getAllCategories,
    createCategory,
    updateCategory
}