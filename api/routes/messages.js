var express = require('express');
var router = express.Router();
const db = require("./firebase")

const {getDocs, addDoc, collection} = require("firebase/firestore")

router.get("/info", async (req, res, next) => {
    const allDocData = []
    // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
    const docs = await getDocs(collection(db, "messages"))
    docs.forEach((doc) => allDocData.push(doc.data()))
    res.json({result: allDocData})
})

router.post("/post", async (req, res, next) => {
    // console.log(req.body)
    const docRef = await addDoc(collection(db, "messages"), {
        "text": req.body.text,
        "likes": req.body.likes,
        "responses": req.body.responses,
        "username": req.body.username
    });
    res.send("Received")
})

module.exports = router