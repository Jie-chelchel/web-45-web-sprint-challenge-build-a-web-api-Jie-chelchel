const express = require("express");
const Projects = require("./projects-model");
const router = express.Router();
const {
  validateProjectId,
  validateProject,
  validateUpdatedProject,
} = require("./projects-middleware");

router.get("/", (req, res, next) => {
  Projects.get()
    .then((projects) => res.status(201).json(projects))
    .catch((err) => {
      next(err);
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.json(req.project);
});

router.post("/", validateProject, (req, res, next) => {
  Projects.insert(req.body)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      next(err);
    });
});

router.put(
  "/:id",
  validateProjectId,
  validateUpdatedProject,
  (req, res, next) => {
    Projects.update(req.params.id, req.body)
      .then((updatedProject) => {
        res.json(updatedProject);
      })
      .catch((err) => {
        next(err);
      });
  }
);

router.delete("/:id", validateProjectId, (req, res, next) => {
  Projects.remove(req.params.id)
    .then((record) => {
      if (record === 1) {
        return res.json(req.project);
      }
    })
    .catch(next);
});

router.get("/:id/actions", validateProjectId, (req, res, next) => {
  Projects.getProjectActions(req.params.id)
    .then((actions) => res.json(actions))
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
