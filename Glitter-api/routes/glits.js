const express = require("express");
const authMiddleware = require("../authMiddleware");
const multer = require("multer");

const User = require("../models/user");
const Glit = require("../models/glit");

const glitRouter = express.Router();

// Create multer object
const imageUpload = multer({
  dest: "public/uploads/",
});

// Create new glit with image or not
glitRouter.post(
  "/",
  authMiddleware,
  imageUpload.single("image"),
  (req, res) => {
    console.log(req.file);
    console.log(req.body);

    if (!req.body.text && !req.file) {
      res.sendStatus(400);
      return;
    }

    const newGlit = new Glit({
      text: req.body.text,
      imagePath: req.file ? "/uploads/" + req.file.filename : "",
      publishDate: req.body.publishDate || Date.now(),
      author: req.jwtInfo.user_id,
    });

    newGlit
      .save()
      .then((glit) => res.json(glit))
      .catch((err) => res.status(500).json(err));
  }
);

// Delete glit (only yours)
glitRouter.delete("/:glitId", authMiddleware, (req, res) => {
  Glit.deleteOne({
    $and: [{ _id: req.params.glitId }, { author: req.jwtInfo.user_id }],
  })
    .then((result) => {
      if (!result.deletedCount) {
        res.sendStatus(404);
        return;
      }
      res.sendStatus(200);
    })
    .catch((err) => res.status(500).json(err));
});

// List glits
// Public zone -- All Glits sorted 'desc'
glitRouter.get("/", (req, res) => {
  feed(req, res);
});

// Private zone -- Default-> only Glits of followed people
glitRouter.get("/private", authMiddleware, (req, res) => {
  User.findOne(
    {
      _id: req.jwtInfo.user_id,
    },
    function (err, user) {
      if (err || !user) {
        res.sendStatus(404);
        return;
      }

      feed(req, res, user.following);
    }
  );
});

// Give kudos to a Glit
glitRouter.post("/:glitId/kudos", authMiddleware, (req, res) => {
  Glit.updateOne(
    { _id: req.params.glitId },
    {
      $addToSet: { kudos: req.jwtInfo.user_id },
    }
  )
    .then(() => Glit.findById(req.params.glitId))
    .then((glit) => res.status(200).json({ kudosSize: glit.kudos.length }))
    .catch((err) => res.status(500).json(err));
});

// Delete kudos to a Glit
glitRouter.delete("/:glitId/kudos", authMiddleware, (req, res) => {
  Glit.updateOne(
    { _id: req.params.glitId },
    {
      $pull: { kudos: req.jwtInfo.user_id },
    }
  )
    .then(() => Glit.findById(req.params.glitId))
    .then((glit) => res.status(200).json({ kudosSize: glit.kudos.length }))
    .catch((err) => res.status(500).json(err));
});

// Used by Public and Private 'get Glits' both
// Returns --> Glits sorted + total number of Glits in database + total number of followed Tweets [PAGINATOR]
const feed = (req, res, followedAuthors) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 10;
  const order = req.query.order || "desc";
  const search = req.query.search;

  console.log("📊 Feed request:", {
    page,
    limit,
    order,
    search,
    hasFollowedAuthors: !!followedAuthors,
  });

  const query = {
    publishDate: { $lte: new Date() },
  };

  // Búsqueda de texto (requiere índice en el modelo)
  if (search) {
    query.$text = { $search: search };
    console.log("🔍 Búsqueda activa:", search);
  }

  if (followedAuthors) {
    query.author = { $in: followedAuthors };
  }

  var options = {
    page,
    limit,
  };
  options.sort = { publishDate: order };

  Glit.countDocuments(query, (err, count) => {
    if (err) {
      console.error("❌ Error al contar documentos:", err);
      res
        .status(500)
        .json({ error: "Error al contar glits", details: err.message });
      return;
    }

    const totalGlits = count;
    console.log(`📝 Total glits encontrados: ${totalGlits}`);

    // Separate query to retrieve the total number of the glits created by followed authors
    const followedAuthorsQuery = followedAuthors
      ? {
          author: { $in: followedAuthors },
        }
      : {};

    Glit.countDocuments(
      followedAuthorsQuery,
      (err, followedAuthorsTotalGlits) => {
        if (err) {
          console.error("❌ Error al contar glits de seguidos:", err);
          res.status(500).json({
            error: "Error al contar glits de seguidos",
            details: err.message,
          });
          return;
        }

        const aggregate = Glit.aggregate([
          {
            $match: query,
          },
          {
            $project: {
              text: 1,
              imagePath: 1,
              publishDate: 1,
              author: 1,
              kudos: { $size: "$kudos" },
            },
          },
        ]);

        Glit.aggregatePaginate(aggregate, options, (err, result) => {
          if (err) {
            console.error("❌ Error en aggregatePaginate:", err);
            res
              .status(500)
              .json({ error: "Error al paginar glits", details: err.message });
            return;
          }

          Glit.populate(
            result.docs,
            {
              path: "author",
              select: "_id username",
            },
            (err, populateResult) => {
              if (err) {
                console.error("❌ Error al popular author:", err);
                res.status(500).json({
                  error: "Error al popular autores",
                  details: err.message,
                });
                return;
              }

              result.docs = populateResult;
              console.log("✅ Feed generado exitosamente");

              res.json({
                totalGlits,
                followedAuthorsTotalGlits,
                ...result,
              });
            }
          );
        });
      }
    );
  });
};

module.exports = glitRouter;
