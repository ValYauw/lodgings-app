const router = require('express').Router();

// Controllers
const CmsController = require('../controllers/cmsController');

// Middleware
const { authentication } = require("../middleware/authentication");
const { authorizeStaff, authorizeAdmin, authorizeDeleteUser, authorizeDeleteLodging } = require("../middleware/authorization");

router.post('/login', CmsController.login);
router.post('/glogin', CmsController.glogin);
router.post('/register', CmsController.register);

router.get('/', CmsController.test("Ini index CMS API"));
router.get('/dataSummary', CmsController.getDataSummary);
router.get('/lodgings', CmsController.listLodgings);
router.get('/lodgings/:id', CmsController.getLodging);
router.get('/types', CmsController.listTypes);
router.get('/users', CmsController.listStaffAndAdmin);
router.get('/users/:id', CmsController.getUser);
router.get('/history', CmsController.getHistory);

router.use(authentication);

router.post('/lodgings', authorizeStaff, CmsController.addLodging);
router.post('/types', authorizeStaff, CmsController.addType);

router.put('/users/:id', authorizeAdmin, CmsController.updateUser);
router.put('/lodgings/:id', authorizeAdmin, CmsController.updateLodging);
router.put('/types/:id', authorizeAdmin, CmsController.updateType);

router.patch('/lodgings/:id', authorizeAdmin, CmsController.changeLodgingStatus);

router.delete('/users/:id', authorizeDeleteUser, CmsController.deleteUser);
router.delete('/lodgings/:id', authorizeDeleteLodging, CmsController.deleteLodging);
router.delete('/types/:id', authorizeAdmin, CmsController.deleteType);

module.exports = router;