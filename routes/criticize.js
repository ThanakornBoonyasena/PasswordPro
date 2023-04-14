const express = require('express');
const router = express.Router()

router.post('/',(req,res) => {
    const password = req.body;
    const passwordlist = Object.values(password);
    console.log("The data is " + passwordlist)
    console.log(typeof passwordlist[0]);
    res.redirect('/play/beginner');
});

module.exports = router;
