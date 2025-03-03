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




module.exports = {
    getAllRoles,
    createRole,
}