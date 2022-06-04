const mongoose=require('mongoose');

const StorySchema=new mongoose.Schema({
    creator : String,
    occupation : String,
    age : Number,
    imageAddress : String,
    story : String
});

module.exports=mongoose.model('stories',StorySchema);