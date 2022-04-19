import  Api  from "../api/api";


export default function LetMeIn({ setAuth }) {
  const LetIn = () => {
    Api.post({
      "uuid": "hello"
    })
      .then( data => {
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
