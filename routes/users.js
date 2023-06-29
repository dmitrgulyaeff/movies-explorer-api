const router = require('express').Router();

const { updateUserInfoValidation } = require('../utils/validation');
const { getCurrentUserInfo, updateUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUserInfo);
router.patch('/me', updateUserInfoValidation, updateUserInfo);

module.exports = router;
