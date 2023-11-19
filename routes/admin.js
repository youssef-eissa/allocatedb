const express = require('express');
const router = express.Router();

const AdminsData = [
    {
        id: 1,
        name: 'mohamed',
        username: 'mohamed',
        email: 'mohamed@ewq.dsa',
        password: '123456',
        type: 'admin',
}
]


router.get('/admins', (req, res) => {
    res.send(AdminsData);
})
router.get('/admins/:username', (req, res) => {
    const found = AdminsData.some(admin => admin.username === req.params.username)
    if(found){
        res.json(AdminsData.filter(admin => admin.username === req.params.username))
    }else{
        res.status(400).json({msg:`no Admin Found `})
    }

})


router.post('/admins', (req, res) => {
  
        const newUser={
        id: usersData.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
    }
    AdminsData.push(newUser)
    res.send(AdminsData)
    }

    
    

)

router.put('/admins/:id', (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let index = AdminsData.findIndex(admin => admin.id === parseInt(id))
    if (index >= 0) {
        let Admin = AdminsData[index]
        Admin.name = name
        Admin.username = username
        Admin.email = email
        Admin.password = password
        
        res.send(Admin)
        
    }
})



module.exports = router