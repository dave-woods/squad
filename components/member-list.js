import React from 'react'
import Link from 'next/link'

const MemberList = ({ members, loadingError }) => {
    if (loadingError) {
        console.error(loadingError)
    }
    return (
        <>
        {
            loadingError ?
            <p className="description">An error occurred while trying to load the member list.</p> :
            members && members.length > 0 ?
            <ul>{ members.map(m => <MemberListItem key={`member-${m.id}`} member={m}/>) }</ul> :
            <p className="description">To get started, add members below.</p>
        }
        <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          max-height: 10em;
          overflow-y: auto;
          max-width: 500px;
          margin: 80px auto 40px;
        }
      `}</style>
        </>
    )
}

const MemberListItem = ({ member }) => {
    return (
    <>
        <li><Link href='/member/[id]' as={`/member/${member.id}`}><a><span>{member.name}</span><span>{member.competitiveLevel}</span></a></Link></li>
        <style jsx>{`
        li {
            background: #EFEFEF;
            cursor: pointer;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
        li:nth-child(even) {
            background: #DEDEDE;
        }
        li:hover {
            background: #D8CFCC;
        }
        span:nth-child(2) {
            width: 100px;
        }
        a {
            padding: 0.5em 20px;
            text-decoration: none;
            color: #333;
            width: 100%;
            height: 100%;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
        }
        `}</style>
    </>
    )
}

export default MemberList