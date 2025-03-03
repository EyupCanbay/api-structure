const ResponseHandler = require('../lib/responseHandler.js');
const CustomError = require('../lib/customError.js');
const Enum = require('../config/Enum.js');
const Roles = require('../models/Roles.js');
const privileges = require('../config/role_privileges.js');
const RolePrivileges = require('../models/RolePrivileges.js');
const mongoose = require('mongoose');

async function getAllRoles() {
    if(await Roles.find().countDocuments() == 0) {
        throw new CustomError(Enum.HTTP_CODES.NOT_FOUND, 'Not Found', 'No roles found');
    }
    else {
        return await Roles.find();
    } 
}

async function createRole(body) {

    console.log(body)
    console.log("BURADAN GEÇTİN")

    const role = new Roles({
        role_name: body.role_name
    });
    await role.save();

    console.log(role._id)
    console.log(body.permissions.length)
    for(let i = 0; i < body.permissions.length; i++) {
        let priv = new RolePrivileges({
            role_id: role._id,
            permission: body.permissions[i],
            created_by: req.user?.id
        });
        await priv.save();
    }
}


async function updateRole(role_id, body) {

    if (body.permissions && !Array.isArray(body.permissions) && body.permissions.length == 0) {  
        let permissions = await role_privileges.find({role_id: body._id});

        let removedPermissions = permissions.filter(p => !body.permissions.includes(p.permission));    // body.permission => ["category_viev", "category_edit"]
        let newPermissions = body.permissions.filter(p => !permissions.map(p => p.permission).includes(p));  // permission [{role_id: "category_view"}, {permission: "category_edit"}]
        if(removedPermissions.length > 0) {
            await RolePrivileges.deleteMany({role_id: body._id, permission: {$in: removedPermissions}});
        }
        if(newPermissions.length > 0) {
            for(let i = 0; i < newPermissions.length; i++) {
                let priv = new RolePrivileges({
                    role_id: role_id,
                    permission: newPermissions[i],
                    created_by: req.user?.id
                });
                await priv.save();
            }
        }
        for(let i = 0; i < body.permissions.length; i++) {
            let priv = new RolePrivileges({
                role_id: role_id,
                permission: body.permissions[i],
                created_by: req.user?.id
            });
            await priv.save();
        }
    }
    return await Roles.findByIdAndUpdate(role_id, body);
}

async function deleteRole(role_id) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await Promise.all([
            Roles.findByIdAndDelete(role_id, {session}),
            RolePrivileges.deleteMany({role_id: role_id}, {session})
        ]);
        await session.commitTransaction();
        console.log('Role deleted successfully');
    } catch (error) {
        await session.abortTransaction();
        throw new CustomError(Enum.HTTP_CODES.INTERNAL_SERVER_ERROR, 'Internal Server Error', error);
    } finally {
        session.endSession();
    }
}




module.exports = {
    getAllRoles,
    createRole,
    updateRole,
    deleteRole,
    
}