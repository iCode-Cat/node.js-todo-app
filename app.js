const express = require(`express`);
const mongoose = require(`mongoose`);
const bodyParser = require(`body-parser`);
const Do = require(`./Model/Do`);
const User = require('./Model/User')
const dbURI = `database`;
mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => {
        app.listen(5000, () => {
            console.log("Server Running");
        })
    })
const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static(`public`))
app.set(`view engine`, `ejs`);
let task = ``;
let value = "";
let access = false;
app.get(`/`, (req, res) => {
    if(access){
        Do.find()
        .then((result) => {
            res.render(`index`, {
                list: result,
                value: value
                
            })
            
        })
    }else{
        res.redirect('login')
    }
  
})
app.post(`/`, (req, res) => {
    const doList = new Do({
        task: req.body.task
    })
    if (req.body.task != ``) {
        doList.save()
            .then((result) => {
                res.redirect(`/`);

            })
            .catch((err) => {
                console.log(err);
            })
    }
})
app.post("/mark", async (req, res) => {
    value = req.body.mark;
    res.redirect('/');
})
app.post("/delete", (req, res) => {
    console.log(req.body.delete);
    Do.findByIdAndDelete(req.body.delete)
        .then((result) => {
            res.redirect("/");
        })
})
app.post("/update", (req, res) => {
    console.log(req.body);
    res.redirect('/')
})

//Register and login control. 

app.get('/register' , (req,res) => {
    access = false; 
    res.render('register');
})

app.post('/register' , (req,res)=> {
    console.log(req.body.username, req.body.password);
    const user = new User ({
        username:req.body.username,
        password:req.body.password
    })
    user.save()
    .then(()=>{res.redirect('login')})
})

app.get('/login', (req, res)=>{
    access = false;
    res.render('login');
})
app.post('/login', (req, res)=>{

    const username = req.body.username
    const password = req.body.password
  
        User.findOne({username}, (err, userFound)=>{
            if(err){
                console.log(err);
            }
            if(userFound){
                if(userFound.password === req.body.password){
                    res.redirect('/')
                    access = true;
                }
            }else{
                console.log('cannot');
                res.redirect('login')
                access = false;
            }
        })
    
   
 

})