const express = require("express");
const router = express.Router();
const Subscriber = require("../../schema/subscriber");
const Joi = require("joi");

// Валідаційна схема для підписки
const subscriptionSchema = Joi.object({
  email: Joi.string().email().required(),
});

// Підписка на нові товари
router.post("/subscribe", async (req, res) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(400).json({ message: "You are already subscribed." });
    }

    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.status(201).json({ message: "Subscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Відписка від нових товарів
router.post("/unsubscribe", async (req, res) => {
  const { error } = subscriptionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { email } = req.body;

  try {
    const subscriber = await Subscriber.findOneAndDelete({ email });
    if (!subscriber) {
      return res.status(404).json({ message: "Email not found" });
    }
    res.status(200).json({ message: "Unsubscription successful!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
