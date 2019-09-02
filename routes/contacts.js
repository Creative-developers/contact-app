var express =  require('express');
var mongojs = require('mongojs')


var router = express.Router();
var db = mongojs('contactlist',['contactlist']);



router.get('/getContacts',function(req,res){
   
   db.contactlist.find(function(err,docs){
   	  if(err) throw err;
      res.json(docs);
   });

 //   var contactList = [
	//    person1 = {
	//    	 name:'Ahmed Nasrullah',
	//    	 email:'ahmednasrullah77@gmail.com',
	//    	 number:'(111) 111-111'
	//    },
	//    person2 = {
	//    	 name:'Ali Nizami',
	//    	 email:'alinizami@gmail.com',
	//    	 number:'(111) 222-222'
	//    },
	//    person3 = {
	//    	 name:'Bilawal Hanif',
	//    	 email:'bilawal@gmail.com',
	//    	 number:'(111) 333-333'
	//    }
	// ];
	// res.json(contactList);
});

router.post('/saveContact',function(req,res){
   db.contactlist.insert(req.body,function(err,docs){
     if(err) throw err;
     res.json(docs);
   });
});

router.put('/manageContact/:id',function(req,res){
   var id = req.params.id;
   db.contactlist.findAndModify({query:{_id:mongojs.ObjectId(id)},update:{$set:{name:req.body.name,email:req.body.email,number:req.body.number}},
     new:true},function(err,docs){
   	   if(err) throw err;
   	   res.json(docs);
   	   console.log(docs)
   }); 
});

router.get('/getContact/:id',function(req,res){
   var id = req.params.id;
   db.contactlist.findOne({_id:mongojs.ObjectId(id)},function(err,docs){
      if(err) throw err;
      res.json(docs);
   });
});

router.delete('/manageContact/:id',function(req,res){
    var id = req.params.id;
    db.contactlist.remove({_id:mongojs.ObjectId(id)},function(err,docs){
    	 if(err) throw err;
    	 res.json(docs);
    	 console.log(id +' has been deleted successfully');
    });
});



module.exports = router;