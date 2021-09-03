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

module.exports = { validateActionId };
