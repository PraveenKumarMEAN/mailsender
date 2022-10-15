const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const path = require("path");
const fs = require("fs");
const sendEmail = async (sourceEmail,content , payload) => {
  try {
    console.log("email");
    const host = process.env.EMAIL_HOST;
    const user = process.env.EMAIL_USER;
    const password = process.env.EMAIL_PASSWORD;
    console.log(host, user, password);
    const transporter = nodemailer.createTransport({
      host: host,
      port: 587,
      tls: {
        rejectUnauthorized: true,
        minVersion: "TLSv1.2",
      },
      secure: false,
      requireTLS: true,
      auth: {
        user: user,
        pass: password,
      },
      logger: true,
    });
    const filePath = path.join(__dirname, "../template/template.hbs");
    const source = fs.readFileSync(filePath, "utf-8").toString();
    console.log(source);
    const template = handlebars.compile(content);
    const htmlToSend = template(payload);
    // console.log(htmlToSend);
    const info = await transporter.sendMail({
      from: `Praveen Kumar <${user}>`,
      to: sourceEmail,
      subject: payload?.subject,
      html: htmlToSend,
    });
    // console.log(info);
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;
