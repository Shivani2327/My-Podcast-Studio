const express=require('express');
const router=express.Router();
const Model=require('../models/podcastModel');

router.post('/add',(req,res)=>{
    //ADD DATABSE OPERATION
    // console.log(req.body);
    // res.send('add user request!!');
    new Model(req.body).save( )
    .then((result) => {
        //when data saved successfully
        res.json(result);
         })
    .catch((err) => {
        res.status(500).json(err);
    });
});
   

///getall

router.get('/getall',(req,res)=>{
    Model.find({ })
    .then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.status(500).json(err);
    });
});
//: denoets parameter.
router.get('/getbyemail/:email',(req,res)=>{
  Model.find({email : req.params.email})
  .then((result) => {
    res.json(result);
    
}).catch((err) => {
    res.status(500).json(err);
});
})

router.get('/getbyid/:id',(req,res)=>{
    Model.findById(req.params.id)
    .then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.status(500).json(err);
    });
})

router.delete('/delete/:id',(req,res)=>{
    Model.findByIdAndDelete(req.params.id)
    .then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.status(500).json(err);
    });
})
//: denotes url parameter
router.put('/update/:id',(req,res)=> {
    Model.findByIdAndUpdate(req.params.id,req.body)
    .then((result) => {
        res.json(result);
        
    }).catch((err) => {
        res.status(500).json(err);
    });
})

module.exports=router;