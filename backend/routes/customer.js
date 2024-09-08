const router = require('express').Router();

// Controllers
const CustController = require('../controllers/custController');

// Middleware
const { getUserDetails, authentication } = require("../middleware/authentication");

router.post('/login', CustController.login);
router.post('/glogin', CustController.glogin);
router.post('/register', CustController.register);

router.post('/qr', CustController.generateQRCode);

router.use(getUserDetails);

router.get('/lodgings', CustController.listLodgings);
router.get('/lodgings/:id', CustController.getLodging);
router.get('/types', CustController.listTypes);
// router.get('/users/:id', CustController.getUser);

router.use(authentication);

router.get('/bookmarks', CustController.getBookmarks);
router.post('/lodgings/:id/bookmark', CustController.addBookmark);
router.delete('/lodgings/:id/bookmark', CustController.removeBookmark);

module.exports = router;