const express = require("express");
const bodyParser = express.json();
const { requireAuth } = require("../middleware/jwt-auth");
const userParksRouter = express.Router();
const UserParksService = require("./userParks-service");
const { format } = require("morgan");

// @route   GET api/user-parks/:user_id
// @desc    Get a user's park list
// @access  Private
// pass in user id in params, Auth header key: Authorization value: Bearer <json web token>

userParksRouter.route("/:id").get(requireAuth, async (req, res, next) => {
  const { id } = req.params;
  try {
    const parksArray = await UserParksService.getUserParks(
      req.app.get("db"),
      id
    );

    if (!parksArray) {
      return next({
        status: 404,
        message: `unable to find a list of parks with id: ${id}`,
      });
    }
    res.json(parksArray);
  } catch (err) {
    next({ status: 500, message: err.message });
  }
});

// @route   PUT api/user-parks/add-park/:id
// @desc    Add a park to user's park list
// @access  Private
//pass in park_code in params and user_id in req.body
// get the original array from the DB, add new park to array, UserParksService.updateParksArray to update array

userParksRouter
  .route("/add-park/:park_code")
  .put(requireAuth, bodyParser, async (req, res, next) => {
    const { park_code } = req.params;
    const { id } = req.body;

    if (!id) {
      return next({ status: 400, message: "user_id is required" });
    }

    try {
      const oldParksArray = await UserParksService.getUserParks(
        req.app.get("db"),
        id
      );

      //if there are no parks in the users park list
      if (oldParksArray.length === 0) {
        let newParksArray = oldParksArray;
        newParksArray.push(park_code);
        await UserParksService.createParksList(req.app.get("db"), id);
        const parksArray = await UserParksService.updateParksArray(
          req.app.get("db"),
          newParksArray,
          id
        );
        res.json(parksArray);
      }

      //if there are already parks in the users park list
      else {
        let newParksArray = oldParksArray[0].parks;
        newParksArray.push(park_code);
        const parksArray = await UserParksService.updateParksArray(
          req.app.get("db"),
          newParksArray,
          id
        );
        res.json(parksArray);
      }
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  });

// @route   PUT api/user-parks/remove-park/:id
// @desc    Remove a park from user's list
// @access  Private
// pass in park code in params -- user_id and index in req.body
// get the original array from the DB, remove the item from array by index, UserParksService.updateParksArray to update array

userParksRouter
  .route("/remove-park/:park_code")
  .put(requireAuth, bodyParser, async (req, res, next) => {
    const { park_code } = req.params;
    const { id, index } = req.body;

    if (!id || !index) {
      return next({ status: 400, message: "user_id and index is required" });
    }

    try {
      const oldParksArray = await UserParksService.getUserParks(
        req.app.get("db"),
        id
      );
      let newParksArray = oldParksArray[0].parks;
      newParksArray.splice(index, 1);
      const updatedParksArray = await UserParksService.updateParksArray(
        req.app.get("db"),
        newParksArray,
        id
      );
      res.json(updatedParksArray);
    } catch (err) {
      next({ status: 500, message: err.message });
    }
  });

module.exports = userParksRouter;
