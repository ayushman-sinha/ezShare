const router=require("express").Router();
const Post=require('../models/Post');
const bcrypt=require('bcrypt');


//Create new post
router.post('/',async (req,res)=>{
    const newPost=new Post(req.body);
    try{
        const savedPost=await newPost.save();
        
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json({message:err});
    }
});

//Update post
router.put("/:id", async (req,res)=>{    
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
                res.status(200).json(updatedPost); 
            }
            catch(err){
                res.status(500).json({message:err}); 
            }
        }
        else{
            res.status(401).json({message:"You are not authorized to update this post"});
        }
    }
    catch(err){
        res.status(500).json({message:err});
    }
})
//Delete Post
router.delete("/:id", async (req,res)=>{    
    try{
        const post=await Post.findById(req.params.id);
        if(post.username===req.body.username){
            try{
                await Post.findByIdAndDelete(req.params.id);
                res.status(200).json({message:"Post deleted successfully"});
            }
            catch(err){
                res.status(500).json({message:err}); 
            }
        }
        else{
            res.status(401).json({message:"You are not authorized to delete this post"});
        }
    }
    catch(err){
        res.status(500).json({message:err});
    }
})

//get Post
router.get("/:id", async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id);
        //console.log(post);
        res.status(200).json(post);
    }
    catch(err){
        res.status(500).json('Did not find Post');
    }  
});

//get all posts
router.get("/", async (req,res)=>{
    const username=req.query.username;
    const category=req.query.cat;
    try{
        let posts;
        if(username){
            posts=await Post.find({username:username});
        }
        else if(category){
            posts=await Post.find({category:{$in:category}});
        }
        else{
            posts=await Post.find({});
        }
        res.status(200).json(posts);
    }
    catch(err){
        res.status(500).json('Did not find Post');
    }  
});

//Add comment to post according to location
router.put("/:id/comment", async (req,res)=>{
    try{
        let post=await Post.findById(req.params.id);
        console.log(post);
        if(post){
            post.comments.push(req.body);
            //console.log(post);
            const updatedPost=await Post.findByIdAndUpdate(req.params.id,{$set:post},{new:true});
            res.status(200).json(updatedPost); 
        }
        else{
            res.status(401).json({message:"You are not authorized to update this post"});
        }
    }
    catch(err){
        res.status(500).json({message:err});
    }
})

module.exports= router