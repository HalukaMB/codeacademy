"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteLocations = exports.modifyLocations = exports.postLocations = exports.getTrashLocations = exports.getCleanedLocations = exports.getAllLocations = void 0;

var _LocationModel = _interopRequireDefault(require("../model/LocationModel.js"));

var _UserModel = _interopRequireDefault(require("../model/UserModel.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getAllLocations = function getAllLocations(req, res) {
  var locations;
  return regeneratorRuntime.async(function getAllLocations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_LocationModel["default"].find({}).populate([{
            path: ["cleanedby"],
            select: ["username", "_id"]
          }, {
            path: ["reportedby"],
            select: ["username", "_id"]
          }]));

        case 3:
          locations = _context.sent;

          if (!locations) {
            _context.next = 8;
            break;
          }

          return _context.abrupt("return", res.send(locations));

        case 8:
          return _context.abrupt("return", res.send({
            error: "No locations found"
          }));

        case 9:
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", res.send({
            error: _context.t0.message
          }));

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getAllLocations = getAllLocations;

var getCleanedLocations = function getCleanedLocations(req, res) {
  var locations;
  return regeneratorRuntime.async(function getCleanedLocations$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(_LocationModel["default"].find({
            category: "clean"
          }).populate({
            path: ["cleanedby"],
            select: ["username", "_id"]
          }));

        case 3:
          locations = _context2.sent;

          if (!locations) {
            _context2.next = 8;
            break;
          }

          return _context2.abrupt("return", res.send(locations));

        case 8:
          return _context2.abrupt("return", res.send({
            error: "No cleaned locations found"
          }));

        case 9:
          _context2.next = 14;
          break;

        case 11:
          _context2.prev = 11;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", res.send({
            error: _context2.t0.message
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 11]]);
};

exports.getCleanedLocations = getCleanedLocations;

var getTrashLocations = function getTrashLocations(req, res) {
  var locations;
  return regeneratorRuntime.async(function getTrashLocations$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(_LocationModel["default"].find({
            category: "trash"
          }).populate({
            path: "reportedby",
            select: ["username", "_id"],
            model: _UserModel["default"]
          }));

        case 3:
          locations = _context3.sent;

          if (!locations) {
            _context3.next = 8;
            break;
          }

          return _context3.abrupt("return", res.send(locations));

        case 8:
          return _context3.abrupt("return", res.send({
            error: "No trash locations found"
          }));

        case 9:
          _context3.next = 14;
          break;

        case 11:
          _context3.prev = 11;
          _context3.t0 = _context3["catch"](0);
          return _context3.abrupt("return", res.send({
            error: _context3.t0.message
          }));

        case 14:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 11]]);
};
/* here we need to modify res send etc */


exports.getTrashLocations = getTrashLocations;

var postLocations = function postLocations(req, res) {
  var newLocation, savedLocation;
  return regeneratorRuntime.async(function postLocations$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          if (!((req.body.lat & req.body.lang) != null)) {
            _context4.next = 15;
            break;
          }

          _context4.prev = 1;
          newLocation = new _LocationModel["default"]({
            locationname: req.body.locationname,
            lat: req.body.lat,
            "long": req.body["long"],
            category: req.body.category,
            reportedby: req.body.userid,
            likes: 0
          });
          _context4.next = 5;
          return regeneratorRuntime.awrap(newLocation.save());

        case 5:
          savedLocation = _context4.sent;
          res.status(201).json({
            message: "place registered!!",
            user: {
              locationname: savedLocation.locationname,
              lat: savedLocation.lat,
              "long": savedLocation["long"]
            }
          });
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](1);
          console.log("this is the error", _context4.t0);
          res.status(500).json({
            message: "Server error. Could not save the new location."
          });

        case 13:
          _context4.next = 16;
          break;

        case 15:
          res.status(500).json({
            message: "Server error. Data on location is missing."
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 9]]);
};

exports.postLocations = postLocations;

var modifyLocations = function modifyLocations(req, res) {
  var filter, update, exisitingLocation;
  return regeneratorRuntime.async(function modifyLocations$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          if (!(req.body.id != "undefined")) {
            _context5.next = 9;
            break;
          }

          filter = {
            _id: req.body.id
          };
          update = {
            $inc: {
              likes: 1
            }
          };
          _context5.next = 5;
          return regeneratorRuntime.awrap(_LocationModel["default"].findOneAndUpdate(filter, update, {
            "new": true
          }));

        case 5:
          exisitingLocation = _context5.sent;
          res.status(201).json({
            message: "place increased!!"
          });
          _context5.next = 10;
          break;

        case 9:
          res.status(500).json({
            message: "something went wrong"
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  });
};

exports.modifyLocations = modifyLocations;

var deleteLocations = function deleteLocations(req, res) {
  var exisitingLocation, filter, update, updated;
  return regeneratorRuntime.async(function deleteLocations$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          if (!(req.body.id != "undefined")) {
            _context6.next = 11;
            break;
          }

          _context6.next = 3;
          return regeneratorRuntime.awrap(_LocationModel["default"].findOne({
            _id: req.body.id
          }));

        case 3:
          exisitingLocation = _context6.sent;

          if (!(exisitingLocation.locationname == req.body.locationname)) {
            _context6.next = 11;
            break;
          }

          filter = {
            _id: req.body.id
          };
          update = {
            category: req.body.category,
            cleanedby: req.body.userid
          };
          _context6.next = 9;
          return regeneratorRuntime.awrap(_LocationModel["default"].findOneAndUpdate(filter, update, {
            "new": true
          }));

        case 9:
          updated = _context6.sent;

          if (updated.acknowledged) {
            res.status(201).json({
              message: "place updated!!"
            });
          }

        case 11:
        case "end":
          return _context6.stop();
      }
    }
  });
};

exports.deleteLocations = deleteLocations;