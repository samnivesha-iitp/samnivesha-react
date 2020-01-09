const router = require("express").Router();

const Event = require("../models/event.model");
const Group = require("../models/group.model");
const Users = require("../models/user.model");
const mongoose = require("mongoose");
// All event
router.route("/").get((req, res) => {
  Event.find()
    .then(event => res.json(event))
    .catch(err => res.json("Error Occured", err));
});
// Indivisual event
router.route("/:id").get((req, res) => {
  Event.findById(req.params.id)
    .then(event => res.json(event))
    .catch(() => res.json({ message: "Error Occured" }));
});
// Add event
router.route("/add").post((req, res) => {
  const {
    eventName,
    description,
    tagline,
    place,
    organiser,
    date,
    rulebook,
    poster,
    isgroupallowed
  } = req.body;
  const newEvent = new Event({
    eventName,
    description,
    tagline,
    place,
    organiser,
    date,
    rulebook,
    poster,
    isgroupallowed
  });
  newEvent
    .save()
    .then(() => res.json("Event Added"))
    .catch(err => res.json("Error", err));
});
// delete event
router.route("/delete/:id").delete((req, res) => {
  const id = req.params.id;
  Event.findByIdAndDelete(id, err => {
    if (err) {
      res.json("Error" + err);
    } else {
      res.json("Event deleted");
    }
  });
});
// update event
router.route("/update/:id").post((req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .then(event => {
      const {
        description,
        tagline,
        place,
        organiser,
        date,
        rulebook,
        poster,
        isgroupallowed
      } = req.body;
      event.description = description;
      event.tagline = tagline;
      event.place = place;
      event.organiser = organiser;
      event.date = date;
      event.rulebook = rulebook;
      event.poster = poster;
      event.isgroupallowed = isgroupallowed;

      event
        .save()
        .then(() => res.json("Event Updated"))
        .catch(err => res.status(400).json("Error" + err));
    })
    .catch(err => {
      res.status(400).json("Error" + err);
    });
});
// group details
router.route("/:id/group").get((req, res) => {
  const eveId = req.params.id;
  Group.find({ event: eveId })
    .populate({
      path: "groupleader",
      select: "firstName lastName username -_id"
    })
    .populate({
      path: "groupmembers",
      select: "firstName lastName username -_id"
    })
    .populate({ path: "event", select: "eventName -_id" })
    .exec(function(err, group) {
      if (err) throw err;
      res.json(group);
    });
});
// add group
router.route("/:id/group/add").post((req, res) => {
  const id = req.params.id;
  let { groupleader, groupmembers } = req.body;
  // groupmembers = groupmembers.map(member => mongoose.Types.ObjectId(member));
  // Check if already registered for that event
  Users.find(
    { $or: [{ _id: groupleader }, { username: { $in: groupmembers } }] },
    function(err, response) {
      if (err) {
        res.status(500).json({ messge: "Internal Server Error" + err });
      } else {
        let count = 0;
        for (let i = 0; i < response.length; i++) {
          if (response[i].events.indexOf(id) !== -1) {
            // member already exist
            res.status(500).json({ message: "Already Registered." });
            count++;
            break;
          }
        }
        if (count == 0) {
          // new group register
          const newGroup = new Group({
            _id: mongoose.Types.ObjectId(),
            groupleader,
            groupmembers,
            event: id
          });
          Group.create(newGroup, (err, group) => {
            if (err) {
              res.json({ message: err });
            }
            Users.find(
              {
                $or: [{ _id: groupleader }, { username: { $in: groupmembers } }]
              },
              function(err, response) {
                if (err) {
                  res.status(500).json("Failed with Error " + err);
                } else {
                  let promises = [];

                  response.forEach(user => {
                    user.events.push(group.event);
                    promises.push(user.save());
                  });
                  // console.log("@@@@outside", group);
                  Event.find({ _id: group.event }, function(err, response) {
                    response[0].groups.push(group._id);
                    promises.push(response[0].save());
                  });
                  Promise.all(promises)
                    .then(data => {
                      res.status(200).json({ message: "Group Added" });
                    })
                    .catch(err => {
                      res.status(500).json({ message: "Internal Error" + err });
                    });
                }
              }
            );
          });
        }
      }
    }
  );
});
// delete group
router.route("/group/delete/:id").delete((req, res) => {
  Group.findByIdAndDelete(req.params.id, err => {
    if (err) {
      res.json("Deletion Failed");
    } else {
      res.json("Group Deleted");
    }
  });
});
// solo event registration
router.route("/:eventId/:userId").post((req, res) => {
  const { eventId, userId } = req.params;
  Users.find({ _id: userId }, function(err, response) {
    if (err) {
      res.status(500).json({ message: "Internal Server Error" });
    } else {
      const user = response[0];
      user.events.push(eventId);
      user
        .save()
        .then(() => {
          res.status(200).json({ message: "OK" });
        })
        .catch(err => {
          res.json({ message: err });
        });
    }
  });
});
module.exports = router;
