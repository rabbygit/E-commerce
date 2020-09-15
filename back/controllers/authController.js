exports.signupPostController = (req, res) => {

    let user = { name, email, password, confirmpassword } = req.body;

    res.status(200).json({
        success: false,
        user,
        errors: ["A verfication link is sent to your given email"]
    })
}

exports.signupGetController = async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "Get"
    })
}

exports.loginPostController = (req, res) => {
    let { email, password } = req.body;
    // let user = {
    //     email,
    //     password
    // }
    console.log(email, password)
    res.status(200).json({
        success: true,
        user: {
            email,
            password
        },
        token: "mytoken"
    })
}


exports.changeController = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({
            success: false
        })
    } catch (error) {
        next(error)
    }
}

exports.userGetController = (req, res) => {
    console.log("USer get ")
    res.status(200).json({
        success: true,
        user: {
            user_id: 1,
            name: "rabby",
            email: "demo@gmail.com",
            phoneNumber: "",
            address: "Dhaka"
        },
        token: "mytoken"
    })
}

exports.userSetController = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({
            success: true,
            user_id: 1,
            name: "rabby",
            email: "demo@gmail.com",
            phoneNumber: "",
            address: "Dhaka"
        })
    } catch (error) {
        next(error)
    }
}

exports.userupdateController = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({
            success: true,
            user_id: 1,
            name: req.body.name,
            email: "demo@gmail.com",
            phoneNumber: req.body.phoneNumber,
            address: req.body.address
        })
    } catch (error) {
        next(error)
    }
}

// GUEST USER LOGIN

exports.loginGuestUserPostController = (req, res) => {
    let { ip } = req.body;
    console.log("Non verified user ip : ", ip)
    res.status(200).json({
        success: true,
        token: "guest token",
        ip: ip,
        non_verified_user_id: 101
    })
}

exports.guestUserGetController = (req, res) => {
    console.log("USer get ")
    res.status(200).json({
        success: true,
        user: {
            non_verified_user_id: 10,
        },
        token: "guest token"
    })
}





exports.cartAddController = async (req, res) => {
    try {
        // console.log(req.params)
        // console.log(req.body)
        return res.status(200).json({
            order: {
                id: 1,
                price_total: 500
            },
            products: [
                {
                    order_id: 1,
                    product_id: req.params.product_id,
                    quantity: 2,
                    price: 300
                }
            ]
        })
    } catch (error) {
        next(error)
    }
}


exports.getCartController = async (req, res) => {
    try {
        console.log(req.params)
        return res.status(200).json({
            price_total: 400,
            products: [
                {
                    order_id: 1,
                    id: 2,
                    title: "Denim Shirt",
                    quantity: 1,
                    price: 300,
                    subPrice: 300
                },
                {
                    order_id: 1,
                    id: 3,
                    title: "Formal Shirt",
                    quantity: 1,
                    price: 100,
                    subPrice: 100
                }
            ]
        })
    } catch (error) {
        next(error)
    }
}

exports.getProductForCheckoutController = async (req, res) => {
    try {
        console.log(req.params)
        return res.status(200).json({
            price_total: 400,
            products: [
                {
                    order_id: 1,
                    id: 2,
                    title: "Denim Shirt",
                    quantity: 1,
                    price: 300,
                    subPrice: 300
                },
                {
                    order_id: 1,
                    id: 3,
                    title: "Formal Shirt",
                    quantity: 1,
                    price: 100,
                    subPrice: 100
                }
            ]
        })
    } catch (error) {
        next(error)
    }
}


exports.getSingleProductController = async (req, res) => {
    try {
        console.log("Single product", req.params)
        return res.status(200).json({
            product: {
                id: 10,
                title: "Formal Shirt",
                quantity: 0,
                price: 100,
                subPrice: 100,
                discount: 5,
                availity: true,
                ratings: 4,
                total_reviews: 14,
                details: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Enim distinctio error architecto maiores tempora laborum temporibus sint corporis placeat amet recusandae reiciendis, accusantium provident obcaecati commodi dolorem, quos facere quae?",
                colors: ["orange", "red", "yellow"],
                sizes: ["XL", "L", "S"],
                images: [
                    "https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg",
                    "https://static-01.daraz.com.bd/original/e53a508af261935da4611eaa10a6952f.jpg_300x300q80.jpg_.webp",
                    "https://static-01.daraz.com.bd/original/1e4225eca5494cba49dc77f13e267306.jpg_300x300q80.jpg_.webp",
                    "https://static-01.daraz.com.bd/original/d2301d586053b59587891b236a382be4.jpg_300x300q80.jpg_.webp"
                ],
                total_ratings: 10,
                features: [
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening",
                    "Adjustable pin buckle fastening"
                ],
                ratings_count: [
                    {
                        rating: 5,
                        count: 10
                    },
                    {
                        rating: 4,
                        count: 10
                    },
                    {
                        rating: 3,
                        count: 10
                    },
                    {
                        rating: 2,
                        count: 4
                    },
                    {
                        rating: 1,
                        count: 2
                    }
                ],
                comments: [
                    {
                        question: {
                            body: "How can I get it ?",
                            user: "XYZ"
                        },
                        answer: {
                            body: "we will provide it by ourself",
                            user: "someone"
                        }
                    },
                    {
                        question: {
                            body: "How can I get it ?",
                            user: "XYZ"
                        },
                        answer: {
                            body: "we will provide it by ourself",
                            user: "someone"
                        }
                    },
                ],
                reviews: [
                    {
                        review_id: 101,
                        body: "Very good product",
                        ratings: 4,
                        user: "rabby hossain",
                        image: "https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
                    },
                    {
                        review_id: 102,
                        body: "Very good product",
                        ratings: 3,
                        user: "",
                        image: "https://images.squarespace-cdn.com/content/v1/59d2bea58a02c78793a95114/1589398875141-QL8O2W7QS3B4MZPFWHJV/ke17ZwdGBToddI8pDm48kBVDUY_ojHUJPbTAKvjNhBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QHyNOqBUUEtDDsRWrJLTmmV5_8-bAHr7cY_ioNsJS_wbCc47fY_dUiPbsewqOAk2CqqlDyATm2OxkJ1_5B47U/image-asset.jpeg"
                    }
                ]
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.getCompanyInfoController = async (req, res) => {
    try {
        console.log("I am from Site Info")
        return res.status(200).json({
            name: "XYZ",
            logo: "https://arenareviews.com/wp-content/uploads/2018/01/3d-company-logo-design.jpg",
            address: "Dhaka , Bangladesh",
            icon: "my icon",
            facebook: "https://www.facebook.com/",
            twitter: "https://twitter.com/",
            linkedin: "https://www.linkedin.com/",
            youtube: "https://www.youtube.com/",
            email: "example@gmail.com",
            phone: "92873623856",
            help_center: "9256812",
            about: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut esse, similique praesentium commodi omnis magni. Earum nulla non, atque a iure, sapiente repellat vel repudiandae totam exercitationem facere sunt esse",
            policy: [
                "My policy 1",
                "My policy 2",
                "My policy 3",
                "My policy 4",
                "My policy 5",
                "My policy 6",
                "My policy 7",
                "My policy 8",
                "My policy 9"
            ],
            terms_condition: [
                "My terms 1 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 2 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 3 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 4 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 5 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 6 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 7 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 8 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 9 Lorem ipsum dolor sit amet consectetur adipisicing elit.",
                "My terms 10 Lorem ipsum dolor sit amet consectetur adipisicing elit."
            ],
            slogan: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam dolor delectus excepturi perferendis nisi quidem provident dignissimos doloribus suscipit saepe? Explicabo assumenda deserunt veritatis quasi, totam ullam beatae! Reprehenderit, nulla!",
            cookies: "my cookies"

        })
    } catch (error) {
        next(error)
    }
}


exports.contactController = async (req, res) => {
    try {
        console.log(req.body)
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        next(error)
    }
}

exports.searchController = async (req, res) => {
    let products = [
        {
            order_id: 1,
            id: 1,
            title: "Denim Shirt",
            quantity: 1,
            price: 100,
            subPrice: 300
        },
        {
            order_id: 1,
            id: 2,
            title: "Formal Shirt",
            quantity: 1,
            price: 200,
            subPrice: 100
        },
        {
            order_id: 1,
            id: 3,
            title: "Denim Shirt",
            quantity: 1,
            price: 300,
            subPrice: 300
        },
        {
            order_id: 1,
            id: 4,
            title: "Formal Shirt",
            quantity: 1,
            price: 400,
            subPrice: 100
        },
        {
            order_id: 1,
            id: 5,
            title: "Formal Shirt",
            quantity: 1,
            price: 500,
            subPrice: 100
        },
        {
            order_id: 1,
            id: 6,
            title: "Formal Shirt",
            quantity: 1,
            price: 600,
            subPrice: 100
        }
    ]
    try {
        console.log(req.query)

        if (req.query.sort == "1") {
            products = products.sort(function (a, b) {
                return b.price - a.price;
            });

        } else {
            products = products.sort(function (a, b) {
                return a.price - b.price;
            });
        }

        return res.status(200).json({
            success: true,
            products
        })
    } catch (error) {
        next(error)
    }
}
