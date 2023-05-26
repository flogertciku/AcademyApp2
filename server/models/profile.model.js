const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
    name: { type: String,
    required:[true,"This field is required"] },
    email: { type: String, required:[true,"This field is required"] },
    imgUrl: { type: String, required:[true,"This field is required"] },
    role: { type: String, required:[true,"This field is required"] },
    betaPlanBelt: {type: Boolean, required:[true,"This field is required"],default:false},
    cDegree: {type: Boolean, required:[true,"This field is required"],default:false}
}, { timestamps: true });
module.exports = mongoose.model('Profile', ProfileSchema);

