const csv = require("csvtojson");
const fs = require("fs");
const sendEmail = require("../utils/email/emailSender");
const mailSender = async (req, res) => {
  try {
    const content = req.body.content
    console.log(req.file, req.body);
    const fileArray = req.file.originalname.split(".");
    if (fileArray.length && fileArray[fileArray.length - 1] === "csv") {
      const rowData = fs.readFileSync(
        `./uploads/${req.file.filename}`,
        "utf-8"
      );
      const jsonArray = await csv().fromString(rowData);
      console.log(jsonArray);
      jsonArray.forEach(data => {
        sendEmail(data.email, content, {name:data.fname, subject:'Test Mail'})
      });
      fs.unlink(`./uploads/${req.file.filename}`, (err)=>{
        console.log(err);
      })
      res.status(200).send({message:'Mail Sending Initiated !', success:true, data:{}})
    } else {
        res.status(400).send({message:'Please Upload Valid CSV File !', success:false, data:{}})
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({message:'Something Went Wrong !', success:false, data:{}})
  }
};
module.exports = {
  mailSender,
};
