//use async await here for actions

const Actions = require("./actions-model");

const validateActionId = (req, res, next) => {
  Actions.get(req.params.id)
    .then((action) => {
      if (action) {
        req.action = action;
        next();
      } else {
        res.status(404).json({ message: "Action id not found" });
      }
    })
    .catch(next);
};

const validateAction = (req, res, next) => {
  if (
    !req.body.description ||
    !req.body.description.trim() ||
    !req.body.notes ||
    !req.body.notes.trim() ||
    !req.body.project_id
  ) {
    res.status(400).json({ message: "note, description" });
  } else {
    next();
  }
};

const validateCompletedKey = (req, res, next) => {
  if (typeof req.body.completed !== "boolean") {
    res.status(400).json({ message: "note, description, completed" });
  } else {
    next();
  }
};

module.exports = { validateActionId, validateAction, validateCompletedKey };
