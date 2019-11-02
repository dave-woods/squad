import React, { useState } from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import AddMember from '../components/add-member'
import MemberList from '../components/member-list'
import mongoose from 'mongoose'
const dotenv = require('dotenv')
dotenv.config()

const levelOptions = [
  'Beginner',
  'Novice',
  'Intermediate',
  'Intervanced',
  'Advanced',
  'Elite',
  'Elite-pro'
]
let cache = {}

const Home = (props) => {
  const [members, setMembers] = useState(props.members)
  if (process.browser) {
    cache['propCache'] = {members, err: props.err};
  }
  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Welcome to Squad</h1>
        <MemberList members={members} loadingError={props.err}/>
        <div className="row">
          <AddMember levelOptions={levelOptions} updateMembers={(newMember) => setMembers(prevMembers => [...prevMembers, newMember])}/>
        </div>
      </div>

      <style jsx>{`
        .hero {
          width: 100%;
          color: #333;
        }
        .title {
          margin: 0;
          width: 100%;
          padding-top: 80px;
          line-height: 1.15;
          font-size: 48px;
        }
        .title,
        .description {
          text-align: center;
        }
        .row {
          max-width: 880px;
          margin: 80px auto 40px;
          display: flex;
          flex-direction: row;
          justify-content: space-around;
        }
      `}</style>
    </div>
  )
}

Home.getInitialProps = async function() {
  if (cache['propCache']) {
    return cache['propCache']
  }
  let props = {
    members: [],
    err: false
  }
  try{
    mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  } catch (err) {
    props.err = err
    return props
  }
  const conn = mongoose.connection
  conn.on('error', (err) => {
    conn.close()
    props.err = err
  })
  try {
    const Member = !mongoose.models.Member ? require('../static/models/memberModel') : mongoose.model('Member')
    props.members = await Member.find({})
  }
  catch (err) {
    props.err = err
  }
  conn.close()
  return props
}

export default Home
