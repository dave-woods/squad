import mongoose from 'mongoose'
const dotenv = require('dotenv')
dotenv.config()

export default async function handle(req, res) {
    mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/squad?retryWrites=true&w=majority`, {useNewUrlParser: true})
    const conn = mongoose.connection
    conn.on('error', (err) => {
        conn.close()
        return res.status(500).json({err})
    })
    conn.once('open', async () => {
        try {
            const Member = !mongoose.models.Member ? require('../../static/models/memberModel') : mongoose.model('Member')
        
            const {name, level, email} = req.body

            Member.countDocuments({}, (err, count) => {
                if (err) {
                    conn.close()
                    return res.status(500).json({err})
                } 
                const newMember = new Member({
                    id: count,
                    name,
                    email,
                    competitiveLevel: level,
                })
                newMember.save((err, newMember) => {
                    conn.close()
                    if (err) {
                        return res.status(500).json({err})
                    }
                    res.json({newMember})
                })
            })
        } catch (err) {
            conn.close()
            return res.status(500).json({err})
        }
    })
}