import Head from '../../components/head'
import Nav from '../../components/nav'
import axios from 'axios'

let cache = {}

const Member = (props) => {
    const { member } = props
    if (process.browser) {
        cache['propCacheMember'] = props
    }
    return (
        <div>
            <Head title={member ? member.name : 'Member ID not found'} />
            <Nav />

            <div className="hero">
                <h1 className="title">{member ? member.name : 'Member ID not found'}</h1>
                <div className="row">
                    <p>{member ? member.competitiveLevel : 'That member doesn\'t seem to exist. Please go back and try again.'}</p>
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

Member.getInitialProps = async function(context) {
    const { id } = context.query
    if (cache['propCacheMember']) {
        return cache['propCacheMember']
    }
    let props = {
        member: undefined,
        err: false
    }
    try {
        const res = await axios({
            method: 'post',
            url: 'api/find-member',
            data: {id}
        })
        if (res.data.error) {
            props.err = res.data.error
        } else {
            props.member = res.data.member
        }
    }
    catch (err) {
        props.err = err
    }
    // conn.close()
    return props
}

export default Member
