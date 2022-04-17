import axios from "axios";


export default function LetMeIn({setAuth}) {
  const LetIn = () => {
    axios.post("https://jogtracker.herokuapp.com/api/v1/auth/uuidLogin", {
      "uuid": "hello"
    })
      .then(async data => {
        setAuth(data.data.response)
      })  

  }
  return (
    <div className='let-me-in_wrapper'>
      <div>
        <img alt="bear-face-icon" src='/images/bear-face.png' />
        <button onClick={LetIn} className='btn'>Let me in</button>
      </div>
    </div>
  )
}
