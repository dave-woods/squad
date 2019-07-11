import React, { useState } from 'react'
import Head from '../components/head'
import Nav from '../components/nav'
import AddMember from '../components/add-member'
import MemberList from '../components/member-list'

// See this file for the shape of the data
import members from '../data/members.json'

const levelOptions = [
  'Beginner',
  'Novice',
  'Intermediate',
  'Intervanced',
  'Advanced',
  'Elite',
  'Elite-pro'
]

const Home = (props) => {
  const [members, setMembers] = useState(props.members)
  return (
    <div>
      <Head title="Home" />
      <Nav />

      <div className="hero">
        <h1 className="title">Welcome to Squad</h1>
        <MemberList members={members} />
        <div className="row">
          <AddMember levelOptions={levelOptions} updateMembers={setMembers}/>
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
  return {
    members
  }
}

export default Home
