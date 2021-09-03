const Projects = require("./projects-model");

const logger = (req, res, next) => {
  const url = req.originalUrl;
  console.log(url);
  const method = req.method;
  const timeStamp = new Date().toLocaleString();
  console.log(`${method} to ${url} at ${timeStamp}`);
  next();
};

const validateProjectId = (req, res, next) => {
  Projects.get(req.params.id)
    .then((project) => {
      if (project) {
        req.project = project;
        next();
      } else {
        res.status(404).json({ message: "project id is not found" });
      }
    })
    .catch(next);
};

const validateProject = (req, res, next) => {
  if (
    !req.body.name ||
    !req.body.name.trim() ||
    !req.body.description ||
    !req.body.description.trim()
  ) {
    res.status(400).json({ message: "name, description, completed" });
  } else {
    next();
  }
};

const validateCompletedKey = (req, res, next) => {
  if (typeof req.body.completed !== "boolean") {
    res.status(400).json({ message: "name, description, completed" });
  } else {
    next();
  }
};

module.exports = {
  logger,
  validateProjectId,
  validateCompletedKey,
  validateProject,
};
