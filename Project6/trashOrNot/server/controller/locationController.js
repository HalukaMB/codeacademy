import LocationModel from "../model/LocationModel.js";

const getAllLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find({});
    console.log('locations', locations)
    if (locations) {
      return res.send(locations)
    } else {
      return res.send({ error: "No users found" })
    }
  } catch (err) {
    return res.send({ error: err.message })
  }
};

const getCleanedLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find({
      category: "clean"
    });
    console.log('locations', locations)
    if (locations) {
      return res.send(locations)
    } else {
      return res.send({ error: "No users found" })
    }
  } catch (err) {
    return res.send({ error: err.message })
  }
};


const getTrashLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find({
      category: "trash"
    });
    console.log('locations', locations)
    if (locations) {
      return res.send(locations)
    } else {
      return res.send({ error: "No users found" })
    }
  } catch (err) {
    return res.send({ error: err.message })
  }
};

const postLocations = async (req, res) => {
  console.log("req.body :>> ", req.body);
  try {
    if ((req.body.lat & req.body.lang) != null) {
      console.log("writing new")
      console.log(req.body.locationname)
      const newLocation = new LocationModel({
        locationname: req.body.locationname,
        lat: req.body.lat,
        long: req.body.long,
        category: req.body.category,
      })
      console.log("newLocation", newLocation)
      const savedLocation = await newLocation.save();
      console.log(savedLocation)
      res.status(201).json({
        message: "place registered!!",
        user: {
          locationname: savedLocation.locationname,
          lat: savedLocation.lat,
          long: savedLocation.long,

        },
      });
    } else {
      res.status(500).json({
        message: "something went wrong",
      });
    }
  } catch (error) {
  }
}

const modifyLocations=async(req,res)=>{
  console.log("req.body :>> ", req.body);

  if (req.body.id!="undefined"){
    const exisitingLocation = await LocationModel.findOneAndUpdate(
      {_id :req.body.id}, {$inc : {'likes' : 1}})
        console.log(exisitingLocation)
        if(exisitingLocation.acknowledged){
  
          res.status(201).json({
            message: "place increased!!"
          });
        }
      }
    }

const deleteLocations = async (req, res) => {
  console.log("req.body :>> ", req.body);
  if (req.body.id!="undefined"){
  const exisitingLocation = await LocationModel.findOne(
    {_id: req.body.id})
    if(exisitingLocation.locationname==req.body.locationname){
      console.log("double checked")

      const filter = { _id: req.body.id};
      const update = { category: req.body.category };
      const updated = await LocationModel.findOneAndUpdate(filter, update, {
        new: true
      });

      if(updated.acknowledged){

        res.status(201).json({
          message: "place updated!!"
        });
      }
    }
  }
}


export { getAllLocations, getCleanedLocations, getTrashLocations, postLocations,modifyLocations, deleteLocations };
