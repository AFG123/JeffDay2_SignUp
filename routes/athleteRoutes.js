const express = require('express');
const Athlete = require('../models/Athlete');
const bcrypt = require('bcrypt');
//const twilio = require('twilio');
const router = express.Router();


// const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

//registration form route
router.get('/register',function(req, res){
    res.render('formtest');
});

router.post('/athletes', async (req, res) => {
  let athlete;

  try {
    let { name, contact, age, email, sport, password } = req.body;

    if(!sport) {
        return res.status(400).send("Please select at least one sport.");
    }
    if (!Array.isArray(sport)) sport = [sport];

    const hashedPassword = await bcrypt.hash(password, 10);

    // const otp = Math.floor(100000 + Math.random() * 900000).toString();
    // const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // 1️⃣ Create athlete FIRST
    athlete = await Athlete.create({
      name,
      contact,
      age,
      email,
      sport,
      password: hashedPassword,
      verified: true
    });
    return res.status(201).send("Registration successful!");


  } catch (dbError) {
    return res.status(400).send(dbError.message);
  }

  // try {
  //   // 2️⃣ Send OTP separately
  //   // await client.messages.create({
  //   //   body: `Your OTP is ${athlete.otp}`,
  //   //   from: process.env.TWILIO_PHONE,
  //   //   to: `+91${athlete.contact}`
  //   // });
  //   console.log("OTP for verification:", athlete.otp);

  //   // 3️⃣ Only now render OTP page
  //   res.render('otp', { athleteId: athlete._id , error: null});

  // } catch (smsError) {
  //       console.error("TWILIO ERROR FULL:", smsError);
  //       return res.status(500).send("User created, but OTP could not be sent."
  //   );
  // }

});




//otp verification route
// router.post('/athletes/verify-otp', async (req, res) => {
//   try {
//     const { athleteId, otp } = req.body;

//     const athlete = await Athlete.findById(athleteId);

//     if (!athlete) {
//       return res.render('otp', {
//         athleteId,
//         error: 'Athlete not found'
//       });
//     }

//     if (athlete.verified) {
//       return res.render('otp', {
//         athleteId,
//         error: 'Already verified'
//       });
//     }

//     if (athlete.otp !== otp) {
//       return res.render('otp', {
//         athleteId,
//         error: 'Invalid OTP'
//       });
//     }

//     if (athlete.otpExpiresAt < Date.now()) {
//       return res.render('otp', {
//         athleteId,
//         error: 'OTP expired'
//       });
//     }

//     // SUCCESS
//     athlete.verified = true;
//     athlete.otp = undefined;
//     athlete.otpExpiresAt = undefined;
//     await athlete.save();

//     res.send('Phone number verified successfully!');

//   } catch (error) {
//     res.render('otp', {
//       athleteId: req.body.athleteId,
//       error: 'Something went wrong. Try again.'
//     });
//   }
// });



module.exports = router;
