const ResponseHandler = require('../lib/responseHandler.js');
const CustomError = require('../lib/customError.js');
const Enum = require('../config/Enum.js');
const Roles = require('../models/Roles.js');


async function getAllRoles() {
    if(await Roles.find().countDocuments() === 0) {
        throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, 'Not Found', 'No roles found');
    }
    else {
        return await Roles.find();
    } 
}

async function createRole(role) {
    const newRole = new Roles(role);
    return await newRole.save();
}

async function updateRole(role_id, body) {
    return await Roles.findByIdAndUpdate(role_id, body);
}

async function deleteRole(role_id) {
    return await Roles.findByIdAndDelete(role_id);
}


module.exports = {
    getAllRoles,
    createRole,
    updateRole,
    deleteRole
}