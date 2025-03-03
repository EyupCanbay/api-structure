const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');



router.get('/', roleController.getAllRoles);
router.post('/', roleController.createRole);
router.put('/:id', roleController.updateRole);
router.delete('/:id', roleController.deleteRole);
<<<<<<< HEAD
router.get('/role_privileges', roleController.get_role_privileges);
=======
>>>>>>> 60f723da7e73ab07052d96c0f735798a1e95582a

module.exports = router;