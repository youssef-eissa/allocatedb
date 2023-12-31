const express = require('express');
const router = express.Router();

const usersData = [
    {
        id: 1,
        name: 'mohamed',
        username: 'mohamed',
        email: 'mohamed@ewq.dsa',
        password: '123456',
        type: 'user',
        sell: [],
        propertyImg:''
}
]

router.get('/users', (req, res) => {
    res.send(usersData);
})
router.post('/users/:username', (req, res) => {
    const found = usersData.some(user => user.username === req.params.username)
    if(found){
        res.json(usersData.filter(user => user.username === req.params.username))
    }else{
        res.status(400).json({msg:`no User Found `})
    }

})


router.post('/users', (req, res) => {
  
        const newUser={
        id: usersData.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
        sell: [],
        propertyImg: ''
    }
    usersData.push(newUser)
    res.send(usersData)
    }

)

router.put('/users/:id', (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let sell = req.body.sell
    let propertyImg = req.body.propertyImg
    let index = usersData.findIndex(user => user.id === parseInt(id))
    if (index >= 0) {
        let user = usersData[index]
        user.name = name
        user.username = username
        user.email = email
        user.password = password
        user.propertyImg = propertyImg
        user.sell.push(sell)
        res.send(user)
        
    }
})



module.exports = router