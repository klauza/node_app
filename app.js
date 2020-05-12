// dependencies
const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const helmet = require('helmet');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
// const cors = require('cors');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.use(cors({
//   origin: 'http://localhost:3000',
//   credentials: true
// }));

// view
// app.engine('handlebars', exphbs());
// app.set('view engine', 'handlebars');

// static folders
// __dirname = current directory
// app.use('/public', express.static(path.join(__dirname, 'public')));

// body-parser middleware
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



// req.body.phone => it has to match the 'name' attribute in the form (or react's sent data)

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact details</h3>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  console.log(output);

  // async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
      // user: 'kanto222@interia.pl',
      // pass: 'ogroman11'
    },

    // if on localhost:
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "mail1@gmail.com, mail2@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output // html body
  });

  // res.render('contact', {msg: 'Email has been sent'});

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
 
  
});

console.log(process.env.DB_PASS)

app.use('/api', routes);

if(process.env.NODE_ENV === 'production'){
  app.use( express.static( `${__dirname}/frontend/build` ) );

  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server has started on port ${PORT}`));