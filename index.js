require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const app = express();
// const cors = require("cors");
app.use(formidable());
// app.use(cors());

const mailgun = require("mailgun-js")({
  apiKey: process.env.API_KEY,
  domain: process.env.DOMAIN,
});

app.post("/form", (req, res) => {
  const data = {
    from: `${req.fields.firstName} ${req.fields.lastName} <${req.fields.email}> `,
    to: "giovanni37200@gmail.com",
    subject: `🚀 exercice formulaire contact  🚀  ${req.fields.subject}`,
    text: `${req.fields.message}`,
  };

  mailgun.messages().send(data, (error, body) => {
    if (error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(200).json({ message: "Données reçues, mail envoyé" });
    }
  });
});

app.all("*", (req, res) => {
  res.json({ message: "All routes" });
});

app.listen(process.env.PORT, () => {
  console.log("Server started");
});
