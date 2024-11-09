const express = require("express");
const router = express.Router();

router.get("/api/category", (req, res) => {
  res.status(200).send(["gold", "silver", "set", "box"]);
});
router.get("/api/category/gold", (req, res) => {
  res.status(200).send({
    category: "gold",
    products: [
      "chains",
      "earrings",
      "bracelets",
      "rings",
      "pendants",
      "tic",
      "incense",
    ],
  });
});
router.get("/api/category/silver", (req, res) => {
  res.status(200).send({
    category: "silver",
    products: [
      "chains",
      "earrings",
      "bracelets",
      "rings",
      "pendants",
      "tic",
      "incense",
    ],
  });
});
router.get("/api/category/set", (req, res) => {
  res.status(200).send({ category: "set", products: [] });
});
router.get("/api/category/box", (req, res) => {
  res.status(200).send({ category: "box", products: [] });
});
module.exports = router;
