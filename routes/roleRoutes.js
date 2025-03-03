const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');



router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
router.get('/role_privileges', roleController.get_role_privileges);

module.exports = router;