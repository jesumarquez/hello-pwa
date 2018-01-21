const express = require('express'),
    app = express(),
    port = process.env.port || '8080'

app.use(express.static('public'))

app.listen(port, () =>{
    console.log('Server is running on http://localhost:' + port)
})