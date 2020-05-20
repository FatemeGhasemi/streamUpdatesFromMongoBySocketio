use mongochat

db.chats.find().forEach(function(user) {
  db.chats.update({_id: user._id}, {$set: {"message": "0912"+ (Math.floor(Math.random() * (9999999 - 1000000 + 1)) + 1000000).toString()}})
})
