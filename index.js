import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app =express();
const port = 3000;

const apiUrl= "https://api.imgflip.com/get_memes";
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const myData = {
    "181913649": { // Drake Hotline Bling
        correctCaption: "Me choosing Netflix over homework",
        wrongCaptions: ["When the pizza arrives", "Monday morning vibes", "Me explaining my plan"]
    },
    "87743020": { // Two Buttons
        correctCaption: "Me deciding between sleep and one more episode",
        wrongCaptions: ["When you find $20 in old jeans", "Me at the buffet", "Choosing a Netflix show"]
    },
    "112126428": { // Distracted Boyfriend
        correctCaption: "Me ignoring my responsibilities for memes",
        wrongCaptions: ["When the new iPhone drops", "Me and my diet", "Monday vs Friday"]
    },
    "222403160": { // Bernie
        correctCaption: "Me asking for 5 more minutes of sleep",
        wrongCaptions: ["When WiFi is slow", "Me at the restaurant", "Waiting for the weekend"]
    },
    "217743513": { // UNO Draw 25
        correctCaption: "Me avoiding awkward conversations",
        wrongCaptions: ["When the teacher asks questions", "Me and vegetables", "Monday feelings"]
    },
    "124822590": { // Left Exit 12
        correctCaption: "Me taking a shortcut that makes things worse",
        wrongCaptions: ["When the food is ready", "Me and exercise", "Friday afternoon"]
    },
    "252600902": { // Always Has Been
        correctCaption: "It was always like this",
        wrongCaptions: ["Wait, it's all homework?", "Me realizing the truth", "When you find out"]
    },
    "322841258": { // Anakin Padme
        correctCaption: "Me making plans I'll never follow",
        wrongCaptions: ["When the plan works", "Me and deadlines", "Friday night plans"]
    },
    "135256802": { // Epic Handshake
        correctCaption: "Us agreeing to never talk about that",
        wrongCaptions: ["When pizza is free", "Me and my bed", "Skipping Monday"]
    },
    "131940431": { // Gru's Plan
        correctCaption: "My plan to sleep early vs what actually happens",
        wrongCaptions: ["When the WiFi works", "Me studying", "Weekend plans"]
    },
    "131087935": { // Running Away Balloon
        correctCaption: "Me running from my responsibilities",
        wrongCaptions: ["When food is ready", "Me and Mondays", "Chasing dreams"]
    },
    "4087833": { // Waiting Skeleton
        correctCaption: "Me waiting for my life to get together",
        wrongCaptions: ["Waiting for pizza", "Me on hold", "Waiting for Friday"]
    },
    "97984": { // Disaster Girl
        correctCaption: "Me watching my life fall apart and smiling",
        wrongCaptions: ["When the plan works", "Me at parties", "Surprise birthday"]
    },
    "80707627": { // Sad Pablo Escobar
        correctCaption: "Me with nothing to do on a Saturday night",
        wrongCaptions: ["When WiFi drops", "Me without coffee", "Waiting for a text back"]
    },
    "129242436": { // Change My Mind
        correctCaption: "Fridays are just pre-Saturdays",
        wrongCaptions: ["Pizza is always good", "Coffee fixes everything", "Sleep is the best hobby"]
    },
    "309868304": { // Trade Offer
        correctCaption: "I receive your homework, you receive my friendship",
        wrongCaptions: ["I receive sleep, you receive productivity", "I receive pizza, you receive salad", "I receive memes, you receive knowledge"]
    },
    "438680": { // Batman Slapping Robin
        correctCaption: "Don't say we're almost there",
        wrongCaptions: ["Stop eating my fries", "Don't touch the thermostat", "Never skip breakfast"]
    },
    "124055727": { // Y'all Got Any More Of That
        correctCaption: "Me after one episode becomes ten",
        wrongCaptions: ["Me after one slice of pizza", "Me after one nap", "Me after payday"]
    },
    "91538330": { // X Everywhere
        correctCaption: "Memes, memes everywhere",
        wrongCaptions: ["Homework, homework everywhere", "Mondays, Mondays everywhere", "Coffee, coffee everywhere"]
    },
    "224015000": { // Bernie Sanders Once Again
        correctCaption: "Me once again asking to skip Mondays",
        wrongCaptions: ["Me asking for free pizza", "Me asking for more sleep", "Me asking for WiFi password"]
    },
};

let mymemes = [];

app.get("/", async(req,res) =>{
    try{   
        const result = await axios.get(apiUrl);
        const allmemes= result.data.data.memes;
        mymemes = allmemes.filter(meme => myData[meme.id]);
        res.render("index.ejs", {memes: mymemes});

    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: "There is no activity!",
        });
    };
});

app.post("/start", async(req,res)=>{
    try{
        //const result = await axios.get(apiUrl);
        const chosenmeme = mymemes[Math.floor(Math.random() * mymemes.length)];
        const data = myData[chosenmeme.id];
        const allCaptions= [data.correctCaption, ...data.wrongCaptions];
        allCaptions.sort(() => Math.random() - 0.5);

        res.render("index.ejs", {
            meme: chosenmeme,
            captions: allCaptions,
            correctCaption: data.correctCaption,
        });

    }catch(error){
        console.error("Failed to make request:", error.message);
        res.render("index.ejs", {
        error: "There is no activity!",
        });
    };
});

app.post("/meme-checking", (req, res) => {
    const selectedCaption = req.body.caption;
    const correctCaption = req.body.correctCaption;

    if (selectedCaption === correctCaption) {
        res.render("index.ejs", { result: "✅ Bingo!" });
        isCorrect: true;
    } else {
        res.render("index.ejs", { result: "❌ Oops! The correct answer was: " + correctCaption });
        isCorrect: false
    }
});

app.listen(port, ()=>{
    console.log(`The port is listening on port ${port}`);
});