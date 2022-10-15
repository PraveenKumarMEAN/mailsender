const { Router } = require("express");
const { mailSender } = require("../controllers/mailSender");
const upload = require("../middleware/fileUploader");
const mailRouter = Router();
mailRouter.post("/sendMail", upload.single("csv"), mailSender);

module.exports = mailRouter;
