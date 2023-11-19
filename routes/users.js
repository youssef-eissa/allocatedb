const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');




const usersData = [
    {
        id: 1,
        name: 'mohamed',
        username: 'mohamed',
        email: 'mohamed@ewq.dsa',
        password: '123456',
        type: 'admin',
}
]


router.get('/users', (req, res) => {
    res.send(usersData);
})
router.get('/users/:username', (req, res) => {
    const found = usersData.some(user => user.username === req.params.username)
    if(found){
        res.json(usersData.filter(user => user.username === req.params.username))
    }else{
        res.status(400).json({msg:`no user with id ${req.params.id}`})
    }

})


router.post('/users', [
    check('username').exists().trim().not().isEmpty().custom(async username => {
                const value = await isMentionNameInUse(username);
                if (value) {
                    throw new Error('username is already exists!!!');
                }
            }),
    
], (req, res) => {
    const error=validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    } else {
        const newUser={
        id: usersData.length + 1,
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        type: req.body.type,
    }
    usersData.push(newUser)
    res.send(usersData)
    }

    
    

})

router.put('/users/:id', (req, res) => {
    let id = req.params.id
    let name = req.body.name
    let username = req.body.username
    let email = req.body.email
    let password = req.body.password
    let carts = req.body.carts
    let index = usersData.findIndex(user => user.id === parseInt(id))
    if (index >= 0) {
        let user = usersData[index]
        user.name = name
        user.username = username
        user.email = email
        user.password = password
        user.carts = carts
        res.send(user)
        
    }
})



module.exports = router