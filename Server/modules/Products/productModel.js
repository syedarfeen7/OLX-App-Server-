const { query } = require('express')
const mongoose = require('mongoose')

let productMoedl = new mongoose.Schema({
    productName: String,
    productType: String,
    productTypeName: String,
    productPrice: String,
    productDescription: String,
    productOwnerName : String,
    profileImage : String,
    productImage: String,
    productAddedOn: { type: Date, default: new Date() },
    userSignedID: mongoose.Schema.Types.ObjectId,

})

let newProductModel = new mongoose.model("Products", productMoedl)

//  *********** QUERY TO ADD NEW PRODUCT IN DATA BASE ************

module.exports.addNewProductInDB = (productDetails) => {
    return new Promise((resolve, reject) => {
        let newProduct = new newProductModel(productDetails)
        newProduct.save((err, doc) => {
            if (err) {
                console.log("Unable to add new product")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

//  ************ QUERY TO GET ALL THE PRODUCTS **********

module.exports.getAllProductsFromDB = (query) => {
    return new Promise((resolve, reject) => {
        newProductModel.find(query, (err, doc) => {
            if (err) {
                console.log("Unable to find all the products")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

//  ************ QUERY TO GET ALL THE PRODUCTS OF SPECIFIC USER BY ID **********

module.exports.getAllTheProductsofSpecificUserFromDB = (query) => {
    return new Promise((resolve, reject) => {
        newProductModel.find({ userSignedID: query }, (err, doc) => {
            if (err) {
                console.log("Unable to find all the products of specific user by id")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

module.exports.getSingleProductFromDB = (query) => {
    return new Promise((resolve, reject) => {
        newProductModel.findOne({_id : query}, (err, doc) => {
            if(err){
                console.log("Unable to get the single product", err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}
//  ************ QUERY TO GET THE PRODUCT OF SPECIFIC USER FOR UPDATING PURPOSE BY PRODUCT ID **********

module.exports.getAllTheProductsExceptLoggedInUserFromDB = (query) => {
    return new Promise((resolve, reject) => {
        newProductModel.find({ userSignedID : {$nin : [query]} }, (err, doc) => {
            if (err) {
                console.log("Unable to get the products of specific user by product id")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}
//  ************ QUERY TO DELETE THE REQQUESTED PRODUCT BY PRODUCT ID **********

module.exports.deleteProductByIDFromDB = (query) => {
    return new Promise((resolve, reject) => {
        newProductModel.deleteOne({ _id: query }, (err, doc) => {
            if (err) {
                console.log("Unable to delete the products of specific user by product id")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

