const axios = require('axios');
const nodemailer = require("nodemailer");

let screenshot = ""
const getScrnsht = () => {
  const link = 'https://hydrones-890f9.web.app';
  axios.get(`https://screenshotapi.net/api/v1/screenshot?url=${link}&token=W0WWGNAZURDLQH0ZRAAU8W8BTN2ECCOG`)
    .then((res) => {
      screenshot = res.data.screenshot;
    });
}

getScrnsht();


async function main() {

  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "4c56204f323ea9",
      pass: "2dbbe3775d6209"
    }
  });


  let info = await transporter.sendMail({
    from: '"hydrones" <hydrones@example.com>', // sender address
    to: "user@example.com, user@example.com", // list of receivers
    subject: "Slick notification", // Subject line
    text: "Hello world?", // plain text body
    html: `<img src="${screenshot}" alt="screen"/>`,
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
