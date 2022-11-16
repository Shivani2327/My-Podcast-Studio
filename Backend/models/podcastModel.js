const {Schema,model}=require('../connection');

const myschema=new Schema({
  title:String,
  image:String,
  file:String,
  uploadedBy:String,
  description:String,
  createdAt:Date,
  likes : {type : Number, default: 0}
});

module.exports=model('podcast',myschema);