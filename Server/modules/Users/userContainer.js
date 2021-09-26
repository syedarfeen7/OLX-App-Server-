const generalModelForSignupAndProfile = require('./userModules')



//  **************** USER SIGN UP DETAILS *****************************************************

module.exports.addNewSignUpUser = (req, res) => {
    // console.log(req.body.signupDetails)
    generalModelForSignupAndProfile.addNewSignUpUserDetailsInDB(req.body.signupDetails)
        .then(newSignupUser => {
            // console.log(newSignupUser)
            res.send({ status: true, user: newSignupUser })
        })
        .catch(err => {
            res.send({ status: false, created: false })
        })
}



//  **************** FUNCTION TO MATCH THE DETAILS  OF USER WHO  WANT TO LOGIN ****************

module.exports.loginWithDetails = (req, res) => {
    let query = { email: req.body.email, pass: req.body.password }

    generalModelForSignupAndProfile.getSingleUSerByForLoginPurpose(query)

        .then(loginUSer => {
            res.send({ status: true, data: loginUSer })
        })
        .catch(err => {
            res.send({ status: false, found: false })
        })
}

//  ****************** FUNCTION TO ADD THE NEW USER PROFILE *********************************

module.exports.addNewUserProfile = (req, res) => {
    // const userId = req.params.id
    generalModelForSignupAndProfile.addNewUserProfileInDB(req.body.profileData)
        .then(newUserProfile => {
            res.send({ status: true, user: newUserProfile })
        })
        .catch(err => {
            res.send({ status: false, created: false })
        })
}

//  ****************** FUNCTION TO GET THE USER PROFILE BY ID **********************************

module.exports.getUserProfileDetails = (req, res) => {
    let userProfileID = req.params.id;
    // console.log(userProfileID)
    generalModelForSignupAndProfile.getUserProfileByIDFromDB(userProfileID)
        .then(success => {
            res.send({ status: true, found: true, data: success })
        })
        .catch(err => {
            res.send({ status: false, found: false })
        })
}

//  ***************** FUNCTION TO UPDATE THE PROFILE OF USER BY ID *****************************

module.exports.updatedUserProfile = (req, res) => {
    let userProfileID = req.params.id;
    let updatedUserProfileFromClient = {
        fullName: req.body.fullName,
        email: req.body.email,
        phone: req.body.phone,
        gender: req.body.gender,
        address: req.body.address,
        profileImage: req.body.profileImage

    }
    // console.log(req.body.data)
    generalModelForSignupAndProfile.updateRequestedUserProfileByID(userProfileID, updatedUserProfileFromClient)
        .then(success => {
            res.send({ status: true, data :  success })

        })
        .catch(err => {
            res.send({ status: false, updated: false })

        })
}

//  ***************** FUNCTION TO GET ALL THE SIGNED UP USER  *****************************

module.exports.getAllSignedUpUsers = (req, res) => {
    generalModelForSignupAndProfile.getAllTheSignedUpUsersFromDB({})
        .then(success => {
            res.send({ status: true, updated: true, allUsers: success })

        })
        .catch(err => {
            res.send({ status: false, updated: false })

        })
}

module.exports.getUser = (req, res) => {
    let id = req.params.id
  
    generalModelForSignupAndProfile.getUserFromDB(id)
        .then(user => {
            console.log(user)
            res.send({status : true, data : user})
        })
        .catch(err => {
            res.send({status : false})
        })
}


module.exports.addProductIntoCart = (req, res) => {
    let userID = req.params.id
   
    let updates = {
        $push: {
            cart: {
                productName: req.body.productDetailsForCart.productName,
                productType: req.body.productDetailsForCart.productType,
                productPrice: req.body.productDetailsForCart.productPrice,
                productImage: req.body.productDetailsForCart.productImage,
                productID: req.body.productDetailsForCart.productID,
            }
        }
    }
    generalModelForSignupAndProfile.addProductIntoCartInDB({_id : userID}, updates)
        .then(sucess => {
            res.send({ added : true, data : sucess})
        })
        .catch(err => {
            res.send({ added : false})
        })
}
//  ************ FUNCTION TO REMOVE THE PRODUCT ID FOR FAVOURITE ***********

module.exports.removeProductFromCart = (req, res) => {
    let productIDFromClient = req.params.id
    console.log(req.body.LoggedInUserId)
    console.log("Product ID", productIDFromClient)
    // let updates = {
    //     $pull: {
    //         cart: {
    //             productId: productIDFromClient,
    //         }
    //     }
    // }
    generalModelForSignupAndProfile.removeProductFromCartInDB({ _id : req.body.LoggedInUserId}, productIDFromClient)
        .then(allProducts => {
            res.send({ status: true, products: allProducts })
        })
        .catch(err => {
            res.send({ status: false })
        })
}

module.exports.removeProductFromAllUsersCart = (req, res) => {
    let id = req.params.id
    generalModelForSignupAndProfile.removeProductFromAllUsersCartInDB(id)
        .then(success => {

            res.send({status : true})
        })
        .catch(err => {
            res.send({status : false})
        })
}