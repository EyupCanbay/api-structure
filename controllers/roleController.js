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

async function createRole(req,res,next) {
    const role = req.body;
    if((role.role_name === "") && (role.is_active === false)) {
        new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role name and is_active cannot be empty');
    } else {
        try {
            const newRole = await roleServices.createRole(role);
            res.status(201).json(ResponseHandler.success('Role created successfully', newRole));
        
        } catch (error) {
            res.status(500).json(ResponseHandler.error('An error occurred', error));
        }
    }
}

async function updateRole(req,res,next) {
    const body = req.body;
    let updates = {}
    if(!req.params.id) return new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role ID is required');
   
    if(body.role_name) updates.role_name = body.role_name;
    if(typeof body.is_active === "boolean") updates.is_active = body.is_active;
   
    try {
        updateRole = await roleServices.updateRole(req.params.id, updates);
        res.status(200).json(ResponseHandler.success('Role updated successfully', updateRole));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

module.exports = {
    getAllRoles,
    createRole,
    updateRole
}