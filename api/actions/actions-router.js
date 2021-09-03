// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const { validateActionId } = require("./actions-middlware");
router.get("/", (req, res, next) => {
  Actions.get()
    .then((actions) => {
      res.json(actions);
    })
    .catch(next);
});

router.get("/:id", validateActionId, (req, res) => {
  res.json(req.action);
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
