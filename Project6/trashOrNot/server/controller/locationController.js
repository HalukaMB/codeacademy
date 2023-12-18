import LocationModel from "../model/LocationModel.js";

const getAllLocations = async (req, res) => {
  try {
    const locations = await LocationModel.find({});
    console.log('locations', locations)
    if (locations) {
      return res.send(locations)
    } else {
      return res.send({ error: "No locations found" })
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
      return res.send({ error: "No cleaned locations found" })
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
      return res.send({ error: "No trash locations found" })
    }
  } catch (err) {
    return res.send({ error: err.message })
  }
};
/* here we need to modify res send etc */
const postLocations = async (req, res) => {
  console.log("req.body :>> ", req.body);
  if ((req.body.lat & req.body.lang) != null) {
    try {
      console.log("writing new")
      const newLocation = new LocationModel({
        locationname: req.body.locationname,
        lat: req.body.lat,
        long: req.body.long,
        category: req.body.category,
        likes: 0
      })
      const savedLocation = await newLocation.save();
      res.status(201).json({
        message: "place registered!!",
        user: {
          locationname: savedLocation.locationname,
          lat: savedLocation.lat,
          long: savedLocation.long,
        },
      });
    } catch (error) {
      console.log("this is the error",error)
      res.status(500).json({
        message: "Server error. Could not save the new location.",
      });
    }
  } else {
    res.status(500).json({
      message: "Server error. Data on location is missing.",
    });

  }
}

const modifyLocations = async (req, res) => {
  console.log("req.body :>> ", req.body);
  console.log("modify")
  if (req.body.id != "undefined") {
    const filter = { _id: req.body.id };
    const update = { $inc: { likes: 1 } };
    const exisitingLocation = await LocationModel.findOneAndUpdate(filter, update, {
      new: true
    });
    console.log(exisitingLocation.acknowledged)
    res.status(201).json({
      message: "place increased!!"
    });
  }
  res.status(500).json({
    message: "something went wrong",
  });
}

const deleteLocations = async (req, res) => {
  console.log("req.body :>> ", req.body);
  if (req.body.id != "undefined") {
    const exisitingLocation = await LocationModel.findOne(
      { _id: req.body.id })
    if (exisitingLocation.locationname == req.body.locationname) {
      console.log("double checked")

      const filter = { _id: req.body.id };
      const update = { category: req.body.category };
      const updated = await LocationModel.findOneAndUpdate(filter, update, {
        new: true
      });

      if (updated.acknowledged) {

        res.status(201).json({
          message: "place updated!!"
        });
      }
    }
  }
}


export { getAllLocations, getCleanedLocations, getTrashLocations, postLocations, modifyLocations, deleteLocations };
