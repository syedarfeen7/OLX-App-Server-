const { query } = require('express')
const mongoose = require('mongoose')

//  ************* USER SIGN UP SCHEEMA **************

let userSignuUpScheema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    cart : [{
        productName : String,
        productType: String,
        productPrice : String,
        productImage : String,
        productID : mongoose.Schema.Types.ObjectId,
    }]
})

let profileScheema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    gender: String,
    address: String,
    profileImage: String,
    userSignupID: mongoose.Schema.Types.ObjectId,

})

let userSignUpModel = new mongoose.model('Signup', userSignuUpScheema)
let userProfileModel = new mongoose.model('Profile', profileScheema)

//  ****************** QUERY TO ADD NEW SIGNUP USER IN DATA BASE *****************

module.exports.addNewSignUpUserDetailsInDB = (data) => {

    return new Promise((resolve, reject) => {
        let newSignUpUser = new userSignUpModel(data)
        newSignUpUser.save((err, doc) => {
            if (err) {
                console.log("Unable to add new signup user")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

//  ****************** QUERY TO LOGGED IN THE USER *****************

module.exports.getSingleUSerByForLoginPurpose = (query) => {

    return userSignUpModel.findOne({ email: query.email, password: query.pass })

    
}

//  ****************** QUERY TO ADD NEW USER PROFILE IN DB *****************

module.exports.addNewUserProfileInDB = (profileData) => {

    return new Promise((resolve, reject) => {
        let newSignUpUser = new userProfileModel(profileData)
        newSignUpUser.save((err, doc) => {
            if (err) {
                console.log("Unable to add new user profile")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}


//  ****************** QUERY TO GET THE USER PROFILE FROM DB BY ID *****************
module.exports.getUserProfileByIDFromDB = (profileId) => {
    return new Promise((resolve, reject) => {
        userProfileModel.findOne({ userSignupID: profileId }, (err, doc) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(doc)
            }
        })

    })
}

//  ******************* QUERY TO UPDATE THE REQUESTED USER PROFILE IN DB *****************

module.exports.updateRequestedUserProfileByID = (query, updates) => {

    return new Promise((resolve, reject) => {
        userProfileModel.updateOne({ _id: query }, updates, ((err, doc) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(doc)
            }
        }))

    })
}

//  ******************* QUERY TO GET ALL THE USERS FROM DB *****************

module.exports.getAllTheSignedUpUsersFromDB = (query) => {
    return new Promise((resolve, reject) => {
        userSignUpModel.find(query, (err, doc) => {
            if (err) {
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

module.exports.getUserFromDB = (query) => {
    return new Promise((resolve, reject) => {
        userSignUpModel.findOne({_id : query}, (err, doc) => {
            if(err){
                reject(err)
            }
            else { 
                resolve(doc)
            }
        })
    })
}

module.exports.addProductIntoCartInDB = (query, updates) => {
    return new Promise((resolve, reject) => {
        userSignUpModel.updateOne(query, updates, (err, doc) => {
            if (err) {
                console.log("Unable to add product in cart")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

//  ************ QUERY TO REMOVE THE PRODUCT FROM CART **********
// db.mycollection.update(
//     { '_id': ObjectId("5150a1199fac0e6910000002") }, 
//     { $pull: { items: { id: 23 } } },
//     false, // Upsert
//     true, // Multi
// );
module.exports.removeProductFromCartInDB = (query, ID) => {
    return new Promise((resolve, reject) => {
        userSignUpModel.updateOne(query, {$pull : {cart: {_id : ID}}}, (err, doc) => {
            if (err) {
                console.log("Unable to remove product from cart")
                console.log(err)
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}

module.exports.removeProductFromAllUsersCartInDB = (id) => {
    return new Promise((resolve, reject) => {
        userSignUpModel.updateMany({$pull : {cart : {productID : id}}}, (err, doc) => {
            if(err){
                reject(err)
            }
            else {
                resolve(doc)
            }
        })
    })
}