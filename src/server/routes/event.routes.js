const router = require("express").Router();

const Event = require("../models/event.model");

router.route("/").get((req, res) => {
  Event.find()
    .then(event => res.json(event))
    .catch(err => res.json("Error Occured", err));
});
router.route("/:id").get((req, res) => {
  Event.findById(req.param.id)
    .then(event => res.json(event))
    .catch(err => res.json("Error Occured", err));
});
router.route("/add").post((req, res) => {
  const eventName = req.body.eventName;
  const organiser = req.body.organiser;
  const place = req.body.place;

  const newEvent = new Event({ eventName, organiser, place });
  newEvent
    .save()
    .then(() => res.json("Event Added"))
    .catch(err => res.json("Error", err));
});

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
router.route("/update/:id").post((req, res) => {
  const id = req.params.id;
  Event.findById(id)
    .then(event => {
      event.eventName = req.body.eventName;
      event.organiser = req.body.organiser;
      event.place = req.body.place;

      event
        .save()
        .then(() => res.json("Event Updated"))
        .catch(err => res.status(400).json("Error" + err));
    })
    .catch(err => {
      res.status(400).json("Error" + err);
    });
});
module.exports = router;
