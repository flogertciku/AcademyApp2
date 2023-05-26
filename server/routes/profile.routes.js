const ProfileController = require("../controllers/profile.controller")
module.exports = (app) => {

    app.post('/api/profiles', ProfileController.createProfile); 
    app.get('/api/profiles', ProfileController.getAllPeople);
    app.patch('/api/profiles/:id', ProfileController.updatePerson);
    app.get('/api/profiles/:id', ProfileController.getPerson);
    app.patch('/api/edit/:id', ProfileController.updatePerson);


    
}