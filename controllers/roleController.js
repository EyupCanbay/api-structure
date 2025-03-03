const roleServices = require('../services/roleServices');
const ResponseHandler = require('../lib/responseHandler.js');
const CustomError = require('../lib/customError.js');
const Enum = require('../config/Enum.js');
const privileges = require('../config/role_privileges.js');

async function getAllRoles(req,res,next){
    try{
        const roles = await roleServices.getAllRoles();
        
        if(roles.length == 0) return res.tatus(201).json(ResponseHandler.error("do not created role", new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role name and is_active cannot be empty')));

        
        res.status(200).json(ResponseHandler.success('Roles retrieved successfully', roles));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

async function createRole(req,res,next) {
    const role = req.body;
    if (!role.permissions || !Array.isArray(role.permissions) || role.permissions == '') {
       return res.status(Enum.HTTP_CODES.BAD_REQUEST).json(ResponseHandler.error('Bad Request', new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Permissions must be an array'))) 
    }
    if((role.role_name === "") || (role.is_active === false)) {
        return res.status(Enum.HTTP_CODES.BAD_REQUEST).json(ResponseHandler.error('Bad Request', new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role name and is_active cannot be empty'))) 
    } else {
        try {
            const newRole = await roleServices.createRole(role);
            res.status(201).json(ResponseHandler.success('Role created successfully', newRole));
        
        } catch (error) {
            res.status(500).json(ResponseHandler.error('An error occurred', new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request',)));
        }
    }
}

async function updateRole(req,res,next) {
    const body = req.body;
    console.log
    let updates = {}
    if(!req.params.id) return new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role ID is required');
    if(body.role_name) updates.role_name = body.role_name;
    if(typeof body.is_active === "boolean") updates.is_active = body.is_active;
    
    
    try {
        updateRoles = await roleServices.updateRole(req.params.id, updates);
        res.status(200).json(ResponseHandler.success('Role updated successfully', updateRoles));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

async function deleteRole(req,res,next) {
<<<<<<< HEAD
    if(!req.params.id) throw new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role ID is required');
=======
    if(!req.params.id) return new CustomError(Enum.HTTP_CODES.BAD_REQUEST, 'Bad Request', 'Role ID is required');
>>>>>>> 60f723da7e73ab07052d96c0f735798a1e95582a
    try {
        await roleServices.deleteRole(req.params.id);
        res.status(200).json(ResponseHandler.success('Role deleted successfully'));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }
}

<<<<<<< HEAD
async function get_role_privileges(req,res,next) {
    try {
        if(privileges.groups === "") throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, 'Not Found', 'No groups found');
        if(privileges.privileges === "") throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, 'Not Found', 'No privileges found');
        res.status(200).json(ResponseHandler.success('Role privileges retrieved successfully', privileges));
    } catch (error) {
        res.status(500).json(ResponseHandler.error('An error occurred', error));
    }   
}

=======
>>>>>>> 60f723da7e73ab07052d96c0f735798a1e95582a
module.exports = {
    getAllRoles,
    createRole,
    updateRole,
<<<<<<< HEAD
    deleteRole,
    get_role_privileges
=======
    deleteRole
>>>>>>> 60f723da7e73ab07052d96c0f735798a1e95582a
}