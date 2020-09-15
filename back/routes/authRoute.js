const router = require('express').Router();

const {
    signupPostController,
    signupGetController,
    // loginGetController,
    loginPostController,
    userGetController,
    userSetController,
    userupdateController,

    // guest USER
    loginGuestUserPostController,
    guestUserGetController,


    changeController,
    cartAddController,
    getCartController,
    getProductForCheckoutController,
    getSingleProductController,
    searchController,

    getCompanyInfoController,

    contactController
    // logoutController,
    // changePasswordGetController,
    // changePasswordPostController
} = require('../controllers/authController')

router.get('/signup', signupGetController)

router.post('/signup', signupPostController)

// router.get('/login', isUnauthenticated, loginGetController)

router.post('/login',loginPostController)
router.post('/user/change', changeController)

router.get('/user', userGetController)

router.post('/setUser', userSetController)

router.post('/updateUser', userupdateController)

// GUEST USER LOGIN
router.post('/guest/login',loginGuestUserPostController)

router.get('/guest/user',guestUserGetController)






// Company Information
router.get('/site/info', getCompanyInfoController)





// router.get('/changePassword', isAuthenticated, changePasswordGetController)
// router.post('/changePassword', isAuthenticated, changePasswordPostController)

// router.get('/logout', logoutController)

router.post(`/cart/add/:product_id/:user_id`, cartAddController)
router.get(`/cart_view/`, getCartController)
router.get('/checkout/:user_id', getProductForCheckoutController)

router.get('/product/:id', getSingleProductController)
router.get('/products/search', searchController)


router.post('/contact', contactController)

module.exports = router;