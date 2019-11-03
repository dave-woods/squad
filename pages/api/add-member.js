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
    
        const {name, level, email} = req.body

        Member.countDocuments({}, (err, count) => {
            if (err) {
                return res.status(500).json({err})
            } 
            const newMember = new Member({
                id: count,
                name,
                email,
                competitiveLevel: level,
            })
            newMember.save((err, newMember) => {
                if (err) {
                    return res.status(500).json({err})
                }
                res.json({newMember})
            })
        })
    } catch (err) {
        return res.status(500).json({err})
    }
}
