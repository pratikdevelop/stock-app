const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://stockUser:0IZYVE7KKFqIiad9@cluster0.nt431ty.mongodb.net/stocks?retryWrites=true&w=majority&appName=Cluster0",  {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
})

