require('dotenv').config();
const nodemailer = require("nodemailer");
const mg = require("nodemailer-mailgun-transport");
const fs = require("fs");
const fsPromises = require('fs').promises;
const handlebars = require("handlebars");
const path = require("path");
const projectName = 'Quick Nurse - Smoke Pack';
const executionTimeStamp = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8");
const readJson = JSON.parse(fs.readFileSync('reports/html-reports/master-report.json', 'utf8'));
const pmcLogo = 'https://i.imgur.com/pmlWcHP.png';
global.tag = process.argv[2];

// (async () => {
//   var ifEq = handlebars.registerHelper('ifEq', function (a, b, options) {
//     if (a == b) return options.fn(this)
//     else return options.inverse(this)
//   });
  
//   summaryStats = {
//     "metrics": {
//       "Suites": `${readJson.suites.length}`,
//       "Passes": `${readJson.metrics.passed}`,
//       "Failures": `${readJson.metrics.failed}`,
//       "Skipped": `${readJson.metrics.skipped}`
//     }
//   }
  
  
//   try {
  
//     const template = handlebars.compile(emailTemplateSource)
//     console.log(tag);       
//     if (tag == "android") {
//       Device_Name = process.env.BS_ANDROID_DEVICE;
//       OS_Version = process.env.BS_ANDROID_VERSION;
//     }
//     else {
//       Device_Name = process.env.BS_iOS_DEVICE;
//       OS_Version = process.env.BS_iOS_VERSION;
//     }
        
//     const htmlToSend = template({
//       message: `Please find attached the execution report of ${projectName} executed on ${executionTimeStamp}.`,
//       DeviceName: `${Device_Name}`,
//       OSVersion: `${OS_Version}`,
//       array: summaryStats,
//       newStats: readJson.suites,
//       ifEq,
//       pmcLogo
//     })

//     pathToAttachment = path.join(__dirname, '../../reports/master-report.pdf');
//     console.log("file path is: " + pathToAttachment);
//     attachment = fs.readFileSync(pathToAttachment).toString("base64");

//     const sgMail = require('@sendgrid/mail')
//     sgMail.setApiKey(process.env.SENDGRID_API_KEY)
//     const msg = {
//       to: ['nimesh.bhatt@pmcretail.com','Sangeetha.Rangaraj@acaciumgroup.com', 'supreetha.suresh@acaciumgroup.com', 'rory.standley@acaciumgroup.com', 'gareth.montgomery@nursingguild.com'],
//       from: 'PMC Automation Team<nimesh.bhatt@pmcretail.com>',
//       subject: `Automation Execution Report: ${projectName} (${executionTimeStamp}) with ${readJson.metrics.failed} failures`,
//       text: 'and easy to do anywhere, even with Node.js',
//       html: htmlToSend,
//       // attachment
//       attachments: [
//         {
//           content: attachment,
//           filename: "master-report.pdf",
//           type: "application/pdf",
//           disposition: "attachment"
//         }
//       ]
//     }
//     sgMail
//       .send(msg)
//       .then(() => {
//         console.log('Email sent')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
//   }
//   catch (error) {
//     console.error(error);
//   }
// })();







const formData = require('form-data');
const Mailgun = require('mailgun.js');

const mailgun = new Mailgun(formData);
const client = mailgun.client({ username: 'api', key: process.env.API_KEY });

(async () => {
  const filepath = path.join(__dirname, '../../reports/master-report.pdf');
  try {
    const file = {
      filename: 'master-report.pdf',
      data: await fsPromises.readFile(filepath)
    };
    const attachment = [file];

    var ifEq = handlebars.registerHelper('ifEq', function (a, b, options) {
      if (a == b) return options.fn(this)
      else return options.inverse(this)
    });
    
    console.log(process.env.API_KEY, process.env.DOMAIN)
    
    summaryStats = {
      "metrics": {
        "Suites": `${readJson.suites.length}`,
        "Passes": `${readJson.metrics.passed}`,
        "Failures": `${readJson.metrics.failed}`,
        "Skipped": `${readJson.metrics.skipped}`
      }
    }
    
    const mailgunAuth = {
      auth: {
        api_key: process.env.API_KEY,
        domain: process.env.DOMAIN,
        timeout: 60000
      }
    }
    
    const smtpTransport = nodemailer.createTransport(mg(mailgunAuth))
    
    const template = handlebars.compile(emailTemplateSource)
    console.log(tag);       
    if (tag == "android") {
      Device_Name = process.env.BS_ANDROID_DEVICE;
      OS_Version = process.env.BS_ANDROID_VERSION;
    }
    else {
      Device_Name = process.env.BS_iOS_DEVICE;
      OS_Version = process.env.BS_iOS_VERSION;
    }
    
    const htmlToSend = template({
      message: `Please find attached the execution report of ${projectName} executed on ${executionTimeStamp}.`,
      DeviceName: `${Device_Name}`,
      OSVersion: `${OS_Version}`,
      array: summaryStats,
      newStats: readJson.suites,
      ifEq,
      pmcLogo
    })

    const data = {
      from: 'PMC Automation Team<nimesh.bhatt@pmcretail.com>',
      to: ['nimesh.bhatt@pmcretail.com','Sangeetha.Rangaraj@acaciumgroup.com', 'supreetha.suresh@acaciumgroup.com', 'rory.standley@acaciumgroup.com', 'gareth.montgomery@nursingguild.com'],
      subject: `Automation Execution Report: ${projectName} (${executionTimeStamp}) with ${readJson.metrics.failed} failures`,
      html: htmlToSend,
      attachment
    };

    const result = await client.messages.create(process.env.DOMAIN, data);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
})();