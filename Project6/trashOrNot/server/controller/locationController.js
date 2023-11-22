import Location from "../model/LocationModel.js";

const getAllLocations = async(req, res) => {
    try {
        const locations = await Location.find({});
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

    const getCleanedLocations = async(req, res) => {
        try {
            const locations = await Location.find({
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


        const getTrashLocations = async(req, res) => {
            try {
                const locations = await Location.find({
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
    export { getAllLocations, getCleanedLocations, getTrashLocations};
