const express = require('express')

const app = new express()
app.use(express.json())

app.get('/hello', async (req, res) => {
    res.json({'hello': 'world'})
})

app.post('/echo', async (req, res) => {
    try {
        res.json({
            'body': req.body
        })
    }
    catch(e) {
        res.json({
            'error': e.message
        })
    }
})

app.listen(8080, () => {
    console.log('Listening on 8080. Ctrl+c to stop this server.')
})