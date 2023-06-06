const User = require("../models/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
module.exports = {

    register: (req, res) => {
        User.create(req.body)
            .then(user => {
                console.log("jemi tek then register")
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);

                return res.cookie("usertoken", userToken, {
                        httpOnly: true
                    }).json({ msg: "success!", user: user });
            })
            .catch(err => {
                console.log("jemi tek err register"+err)
                return res.status(400).json(err)
            });
    },


    logout: (req, res) => {
        console.log("deleted")
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },


    login: async (req, res) => {
        console.log(process.env.SECRET_KEY)
        const user = await User.findOne({ email: req.body.email });

        if (user === null) {
            // email not found in users collection
            return res.status(400).json({ errors: { email: { message: "There Is a no user with this email" } } });
        }

        // if we made it this far, we found a user with this email address
        // let's compare the supplied password to the hashed password in the database
        const correctPassword = await bcrypt.compare(req.body.password, user.password);

        if (!correctPassword) {
            // password wasn't a match!
            return res.status(400).json({ errors: { password: { message: "The passcode is incorrect" } } });

        }

        // if we made it this far, the password was correct
        const userToken = jwt.sign({
            id: user._id
        }, process.env.SECRET_KEY);
        console.log(userToken)
        // note that the response object allows chained calls to cookie and json
        res.cookie("usertoken", userToken, {
                httpOnly: true
            })
            .json({ msg: "success!" ,token:userToken});
    }


}