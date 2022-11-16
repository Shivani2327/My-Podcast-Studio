const {Schema,model}=require('../connection');

const myschema=new Schema({
  name:String,
  email:String,
  mobileno:String,
  password:String,
  age:Number,

});

module.exports=model('users',myschema);