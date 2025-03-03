const roleServices = require('../services/roleServices');
const ResponseHandler = require('../lib/responseHandler.js');
const CustomError = require('../lib/customError.js');
const Enum = require('../config/Enum.js');

async function getAllRoles(req,res,next){
    try{
        const roles = await roleServices.getAllRoles();
        
        if(roles.length === 0) return res.status(404).json(ResponseHandler.error('No roles found'));
        

        res.status(200).json(ResponseHandler.success('Roles retrieved successfully', roles));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

module.exports = {
    getAllRoles,
}