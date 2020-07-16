const express = require('express');
const ProductData = require('./src/model/ProductData');
const userData = require('./src/model/userData')
const cors = require('cors');
const jwt = require('jsonwebtoken');
var bodyparser = require('body-parser');

var app = new express();

app.use(bodyparser.json())
app.use(cors());

app.get('/products', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    ProductData.find()
        .then(function(products){
            res.send(products);

    });
});


app.post('/insert', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    var product = {
        productId : req.body.product.productId,
        productName : req.body.product.productName,
        productCode : req.body.product.productCode,
        releaseDate : req.body.product.releaseDate,
        description : req.body.product.description,
        price : req.body.product.price,
        starRating : req.body.product.starRating,
        imageUrl : req.body.product.imageUrl,
    }

var product = new ProductData(product);
product.save();
});


app.post('/delete', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    id=req.body.id;
    
    ProductData.findOneAndDelete({_id:id}).then(function(){
        console.log("Delete success"); 
        ProductData.find()
        .then(function(products){
            res.send(products);
        });
    })
})

app.post('/edit', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
    console.log(req.body);
    id=req.body.id;
    
    ProductData.findByIdAndUpdate({_id:id}).then(function(){
        console.log("Edited successfully product"); 
        ProductData.find()
        .then(function(products){
            res.send(products);
        });
      })
    })

    app.post('/register',(req,res)=>{
        let UserData = req.body;
        console.log(req.body);
        let user = new  userData (UserData);
        user.save((err,regUser)=>{
            if(err){
                console.log(err);
            }
            else{
                // let payload = {subject : user._id}
                // let token = jwt.sign(payload,'secretKey')
                // res.status(200).send({token})
                res.status(200).send(regUser);
            }
        });
    });


// app.post('/register', function(req,res){
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
//     console.log(req.body);
//     var user = {
//         email : req.body.user.email,
//         password : req.body.user.password
            
//         }
    
//     var user = new userData(user);
//     user.save();
//     });




app.post('/login', (req,res)=> {
    let UserData = req.body;
    console.log(UserData);
    // let user = new userData (UserData)
    userData.findOne({email: UserData.email},(err,user) =>{
        if(err){
            console.log(err)
        } 
        else{
            if(!user){
                res.status(401).send("invalid Email");
            }
            else{
                if(user.password !== UserData.password){
                res.status(401).send("invalid password")
                }
                else{

                    // let payload = {subject : user._id}
                    // let token = jwt.sign(payload,'secretKey')
                    // res.status(200).send({token})
                    res.status(200).send(user)
                }
            }   
        }
    });
});

app.listen(3000, function(){
    console.log('listening to port 3000');
    
})
