const Profile = require("../models/profile.model")

module.exports.createProfile = (request, response) => {
    if (request.body.role === "Teacher") {

        Profile.findOne({role:"Teacher"})
        .then(person => {
            if (person) {
                return response.status(400).json({ errors: { role: { message: "There Is a Teacher Already" } }})

            }else{
                    Profile.create(request.body)
            .then(profile => response.json(profile))
            .catch(err => response.status(400).json(err));
            }
            
            
        })
    }
    else{
        console.log("testing")
        Profile.create(request.body)
        .then(profile => response.json(profile))
        .catch(err => response.status(400).json(err));
        
    }
    
}
module.exports.getAllPeople = (request, response) => {
    Profile.find({}).sort({name:'asc'})
        .then(persons => {
            console.log(persons); //console logs are optional, but they are highly recommended for troubleshooting!
            response.json(persons);
        })
        .catch(err => {
            console.log(err)
            response.json(err)
        })
}
module.exports.updatePerson = (request, response) => {
    console.log("updatedPerson"+response.body)
    if (request.body.role === "Teacher") {

        Profile.findOne({role:"Teacher"})
        .then(person => {
            if (person) {
                return response.status(400).json({ errors: { role: { message: "There Is a Teacher Already" } }})

            }else{
                Profile.findOne({_id: request.params.id})
                .then(prof=>{
                    prof.name = request.body.name,
                    prof.role=request.body.role,
                    prof.email=request.body.email,
                    prof.imgUrl=request.body.imgUrl,
                    prof.betaPlanBelt=request.body.betaPlanBelt,
                    prof.cDegree=request.body.cDegree
                    prof.save()

                })
          
                .catch(err => 
                    {console.log("errornjesh"+err)
                    return response.status(400).json(err)})

                // Profile.findOneAndUpdate({_id: request.params.id}, request.body, {new:true})
                // .then(updatedPerson => {response.json(updatedPerson)
                // console.log(updatedPerson)})
                // .catch(err => 
                //     {console.log(err)
                //     response.status(400).json(err)})
            }
            
            
        })
    }else{
        Profile.findOne({_id: request.params.id})
        .then(prof=>{
            prof.name = request.body.name,
            prof.role=request.body.role,
            prof.email=request.body.email,
            prof.imgUrl=request.body.imgUrl,
            prof.betaPlanBelt=request.body.betaPlanBelt,
            prof.cDegree=request.body.cDegree
            prof.save()
            .then(res=> response.json(res))
            .catch(err => 
                {console.log("errordy"+err)
                 return response.status(400).json(err)})
            

        })
        
        .catch(err => 
            {console.log("errorFundit"+err)
            return response.status(400).json(err)})
        }
}
module.exports.getPerson = (request, response) => {
    Profile.findOne({_id:request.params.id})
        .then(person => response.json(person))
        .catch(err => response.json(err));
}


