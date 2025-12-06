import express from 'express'
import cors from 'cors'
import { ResponseError } from './error.js'
import { createUserService } from './service.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/api/health', (req, res) => {
    res.json({
        message: "OK",
        data: {}
    })
})

app.post('/api/users', (req, res) => {
    const payload = req.body
    const result = createUserService(payload)

    res.status(201).json({
        message: 'Berhasil menambahkan user',
        data: result
    })
})


app.use((err, req, res, next) => {
    console.log(err);
    console.warn(`Error: ${err}`);

    if(err instanceof ResponseError) {
        res.status(err.status).json({
            errors: err.message
        })
    } else {
        res.status(500).json({
            errors: 'Server Error'
        })
    }
})

app.listen(3001, () => {
    console.log('Server running 127.0.0.1:3001');
})

export {
    app
}