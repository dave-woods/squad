const connectToDb = require('./db')

export default async function handle(req, res) {
    let conn
    try{
        const mg = await connectToDb()
        conn = mg.connection
    } catch (err) {
        return res.status(500).json({err})
    }
    conn.on('error', (err) => {
        return res.status(500).json({err})
    })
    try {
        const Member = require('../../static/models/memberModel')
    
        const {id} = req.body

        const member = await Member.findOne({ id })
        res.json({member})
    } catch (err) {
        return res.status(500).json({err})
    }
}
