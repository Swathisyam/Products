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

// app.post('/edit', (req,res) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods:GET,POST,PATCH,PUT,DELETE,OPTIONS');
//     console.log(req.body);
//     id=req.body.id;
    
//     ProductData.findByIdAndUpdate({_id:id}).then(function(){
//         console.log("Edited successfully product"); 
//         ProductData.find()
//         .then(function(products){
//             res.send(products);
//         });
//       })
//     })

app.post('/edit',(req,res)=>{
    id=req.body.ID.id;
    console.log(id);
        
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST,PUT, PATCH, DELETE, OPTIONS");
      
    ProductData.findOneAndUpdate({_id:id},
        {
        productId:req.body.product.productId,
        productName:req.body.product.productName,
        productCode:req.body.product.productCode,
        price:req.body.product.price,
        starRating:req.body.product.starRating,
        imageUrl:req.body.product.imageUrl,     
        releaseDate:req.body.product.releaseDate, 
        description:req.body.product.description
        },
        (err,doc)=>
        {if(err)
            console.log(err)} )
        
        })
    
    
app.post('/editedlist',(req,res)=>{
    
    console.log("editedlist")
    id=req.body.ID.id;
    console.log(id);
    ProductData.findById({_id:id})
    .then((product)=>
    {
        res.send(product)
    });
    
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
