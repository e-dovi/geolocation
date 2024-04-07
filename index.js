const bodyParser = require('body-parser');
const express = require('express')
const app = express();
const getData = require('./gcs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json())
app.use(cookieParser());
app.use(express.json());

const verifyToken = (req, res, next) => {
  //console.log(typeof(req.cookies.access_token))
  console.log(req.cookies);
  if((req.cookies) && (req.cookies.access_token)){

    const tkn = req.cookies.access_token.split(' ')[1];

    jwt.verify(tkn, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden
       // Attach user info to the request
      else{
       return next();
      }
    });   
  }
  else{
    return res.sendStatus(403);
  }
}

app.get('/', (req, res) => {

  const date = new Date()
  const ip = req.ip;

  if(ip){
    const data = {ip, date};
  //console.log(`data: ${data}`);


  var token = jwt.sign(data, process.env.JWT_SECRET);
  console.log(token);

  res.cookie('access_token', 'Bearer ' + token, {
    expires: new Date(Date.now() + 300000), // cookie will be removed after 8 hours
    httpOnly:true
  })

  res.sendFile(path.join(__dirname, 'front', 'index.html'));
  }

  else{
    res.sendStatus(403);
  }
});


app.use(express.static(path.join(__dirname, 'front')));

const upload = multer();



// Handle form submission
app.post('/submit', verifyToken, upload.none(), (req, res) => {
  const formData = req.body; // Access form data here
  console.log(formData); // Log the form data to the console
  // Process the data as needed
  const ar = Object.values(req.body);
  const location = ar.shift();
  console.log(location);
  console.log(ar);
  res.send('Form data received successfully!');

});



app.post('/sort', upload.none(), verifyToken, (req, res) => {
    
   

    const ar = Object.values(req.body);
    const pos = ar.shift();
    console.log(ar);
    console.log('<------->');
    console.log(pos);
    
       getData(ar, pos)
        .then(r =>{
            res.json(r)
        })
       
    })
    

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT} ...`)
})

/*
{
    "addresses": [
        "292+Main+St+Cambridge",
        "1115+Piedmont+St+SE+Roanoke",
        "841+Broadway+New+York",
        "1921+w+gate+city+blvd+greensboro",
        "1834+Wake+Forest+Rd+Winston+Salem",
        "689+Rue+Djable+Lome+Togo"
    ],
    "location": "pembroke+rd+greensboro"
}
*/

