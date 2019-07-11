import React, { useState } from 'react'
import axios from 'axios'

const AddMember = ({levelOptions, updateMembers}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [level, setLevel] = useState(levelOptions[0])
  const formSubmit = (e) => {
    e.preventDefault()
    axios({
        method: 'post',
        url: 'api/add-member',
        data: {name, level, email}
    }).then(function(response) {
      // Display whether the add was successful here
      if (response.data.error) {
        console.log(response.data.error)
      } else {
        updateMembers(response.data.members) // this won't work with hot-reloading active i.e. dev mode!
        setName('')
        setEmail('')
        setLevel(levelOptions[0])
      }
    }).catch(function(error) {
      console.log(error)
    })
  }
  return (
    <>
      <form autoComplete="off">
        <h3>Add Member to Squad</h3>
        <div><input onChange={e => setName(e.target.value)} value={name} type="text" name="name" placeholder="Member Name" required /></div>
        <div><input onChange={e => setEmail(e.target.value)} value={email} type="email" name="email" placeholder="email@address.com" /></div>
        <div>
          <select value={level} onChange={e => setLevel(e.target.value)}>
            { levelOptions.map((o, i) => <option key={`level-option-${i}`} value={o}>{o}</option>) }
          </select>
        </div>
        <div><button onClick={formSubmit} type="submit">Add ➡️</button></div>
      </form>

      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          width: 500px;
          height: 400px;
          align-items: center;
          justify-content: space-evenly;
          border: 1px solid #DEDEDE;
        }
        div {
          width: 80%;
          display: flex;
          justify-content: center;
        }
        h3 {
          width: 100%;
          text-align: center;
        }
        button {
          background: #2FA318;
          color: #FFFFFF;
          border: none;
          padding: 12px 8px;
          border-radius: 6px;
          width: 30%;
          cursor: pointer;
          font-weight: bold;
        }
        input {
          box-sizing: border-box;
          padding: 12px 8px;
          width: 100%;
        }
        select {
          background: white;
          box-sizing: border-box;
          width: 100%;
          padding: 12px 8px;
        }
      `}</style>
    </>
  )
}

export default AddMember
