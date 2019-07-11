import fs from 'fs'
const members = require('../../data/members.json')

export default async function handle(req, res) {
    const {name, level, email} = req.body
    const newMember = {
        "id": members ? members.length + 1 : 1,
        "name": name,
        "email": email || "",
        "entries": [
            {
                "date": Date.now(),
                "competitiveLevel": level
            }
        ]
    }
    members.push(newMember)
    fs.writeFile('data/members.json', JSON.stringify(members, null, 2), function (error) {
        if (error) return res.json({error});
        console.log(`Adding new member ${name} to 'members.json'`);
        res.json({members})
    })
}