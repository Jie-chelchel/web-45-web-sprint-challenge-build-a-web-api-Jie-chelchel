// Write your "actions" router here!
const express = require("express");
const router = express.Router();
const Actions = require("./actions-model");
const {
  validateActionId,
  validateAction,
  validateUpdatedAction,
} = require("./actions-middlware");
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

router.post("/", validateAction, (req, res, next) => {
  Actions.insert(req.body)
    .then((action) => {
      res.json(action);
    })
    .catch(next);
});

router.put("/:id", validateAction, validateUpdatedAction, (req, res, next) => {
  Actions.update(req.params.id, req.body)
    .then((updatedAction) => {
      res.json(updatedAction);
    })
    .catch(next);
});

//eslint-disable-next-line
router.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = router;
