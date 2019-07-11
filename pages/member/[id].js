import React from 'react'
import Head from '../../components/head'
import Nav from '../../components/nav'
import { useRouter } from 'next/router'

// See this file for the shape of the data
import members from '../../data/members.json'

const Member = ({ members }) => {
    const router = useRouter()
    const member = members.find(m => m.id === parseInt(router.query.id))
    if (member) {
        return (
            <div>
                <Head title={member.name} />
                <Nav />

                <div className="hero">
                    <h1 className="title">{member.name}</h1>
                    <div className="row">
                        <p>{member.entries[member.entries.length - 1].competitiveLevel}</p>
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
    } else {
        return (
            <div>
                <Head title="Member ID not found" />
                <Nav />

                <div className="hero">
                    <h1 className="title">Member ID not found</h1>
                    <div className="row">
                        <p>That member doesn't seem to exist. Please go back and try again.</p>
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
}

Member.getInitialProps = async function() {
    return {
        members
    }
}

export default Member
