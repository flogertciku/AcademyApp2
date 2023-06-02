const ProfileController = require("../controllers/profile.controller")
const { authenticate } = require('../config/jwt.config');
module.exports = (app) => {

    app.post('/api/profiles',authenticate, ProfileController.createProfile); 
    app.get('/api/profiles',authenticate, ProfileController.getAllPeople);
    app.patch('/api/profiles/:id',authenticate, ProfileController.updatePerson);
    app.get('/api/profiles/:id',authenticate, ProfileController.getPerson);
    app.patch('/api/edit/:id',authenticate, ProfileController.updatePerson);


    
}