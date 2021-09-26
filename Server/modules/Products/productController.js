const productMoedl = require('./productModel')

//  ************ FUNCTION TO ADD NEW PRODUCT ************

module.exports.addNewProduct = (req, res) => {
    productMoedl.addNewProductInDB(req.body.productDetails)
        .then(success => {
            res.send({ status: true, added: true })
        })
        .catch(err => {
            res.send({ status: false, added: false })
        })
}

//  ************ FUNCTION TO GET ALL THE PRODUCTS ************

module.exports.getAllProducts = (req, res) => {
    productMoedl.getAllProductsFromDB({})
        .then(allProducts => {
            res.send({ status: true, found: true, products: allProducts })
        })
        .catch(err => {
            res.send({ status: false, found: false })
        })
}

//  ************ FINCTION TO GET ALL THE PRODUCTS OF SPECIFIC USER BY ID ***********

module.exports.getAllTheProductsofSpecificUser = (req, res) => {
    let id = req.params.id
    productMoedl.getAllTheProductsofSpecificUserFromDB(id)
        .then(allProducts => {
            console.log(allProducts)
            res.send({ status: true, found: true, products: allProducts })
        })
        .catch(err => {
            res.send({ status: false, found: false })
        })
}

module.exports.getSingleProduct = (req, res) => {
    let id = req.params.id;
    productMoedl.getSingleProductFromDB(id)
        .then(singlePro => {
            res.send({ status: true, product: singlePro })
        })
        .catch(err => {
            res.send({ status: false })
        })
}
//  ************ FINCTION TO GET THE PRODUCT OF SPECIFIC USER FOR UPDATING PURPOSE BY PRODUCT ID ***********

module.exports.getALLTheProductsExceptLoggedInUser = (req, res) => {
    let id = req.params.id
    productMoedl.getAllTheProductsExceptLoggedInUserFromDB(id)
        .then(allProducts => {
            res.send({ status: true, found: true, products: allProducts })
        })
        .catch(err => {
            res.send({ status: false, found: false })
        })
}
//  ************ FINCTION TO DELETE THE REQUESTED PRODUCT BY PRODUCT ID ***********

module.exports.deleteProductByID = (req, res) => {
    let id = req.params.id
    productMoedl.deleteProductByIDFromDB(id)
        .then(allProducts => {
            res.send({ status: true })
        })
        .catch(err => {
            res.send({ status: false })
        })
}

