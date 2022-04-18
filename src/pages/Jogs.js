import React, { useEffect, useState } from 'react'
import Api from '../api/api'
import AddForm from '../components/AddForm'
import EditForm from '../components/EditForm'

const Jogs = React.memo(({ dateFrom, dateTo, activeBurger }) => {
  const data = JSON.parse(localStorage.getItem("data"))
  const [jogs, setJogs] = useState([])
  const [added, setAdded] = useState(0);
  const [active, setActive] = useState(false)
  const [editedDistance, setEditedDistance] = useState(0)
  const [editedTime, setEditedTime] = useState(0)
  const [editedDate, setEditedDate] = useState("")
  const [editActive, setEditActive] = useState(false)
  const [jogId, setJogId] = useState(0)
  const [userId, setUserId] = useState("")
  const [user, setUser] = useState({})
  const [jogsState, setJogsState] = useState(false);

  useEffect(() => {
    Api.get("auth/user", {
      headers: { 'Authorization': `Bearer ${data.access_token}` }
    })
      .then(res => setUser(res.data.response))
  }, [])

  useEffect(() => {
    Api.get("data/sync", {
      headers: { 'Authorization': `Bearer ${data.access_token}` }
    })
      .then(res => setJogs(res.data.response.jogs))
  }, [added]);



  useEffect(() => {
    jogs.forEach((el) => {
      if (user.id === el.user_id) {
        setJogsState(true)
      }
    })
  }, [jogs])


  const edit = (e) => {
    e.preventDefault()
    Api.put("data/jog", {
      'date': editedDate,
      "time": editedTime,
      "distance": editedDistance,
      "jog_id": jogId,
      "user_id": userId
    },
      {
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      })
    setAdded(added + 1)
    setEditActive(false)
  }
  const editModalOpen = (id) => {
    jogs.forEach((el) => {
      if (el.id === id) {
        setEditedDistance(el.distance)
        setEditedTime(el.time)
        let yourDate = new Date(el.date * 1000);
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        const date = yourDate.toISOString().split('T')[0]
        setEditedDate(date)
        setJogId(el.id)
        setUserId(el.user_id)
        setEditActive(true)
      }
    })
  }
  return (

    <div>
      <AddForm data={data} setActive={setActive} active={active} added={added} setAdded={setAdded} />
      <EditForm
        setEditActive={setEditActive} setEditedDate={setEditedDate}
        setEditedDistance={setEditedDistance} setEditedTime={setEditedTime}
        editedDate={editedDate} editedDistance={editedDistance}
        editedTime={editedTime} edit={edit} editActive={editActive}
      />
      {
        jogsState
          ?
          <div className={'jogs_wrapper ' + ((active || editActive || activeBurger) ? "active" : "")}>
            <div>
              <div className='jogs-card_wrapper'>
                {jogs.map((el) => user.id === el.user_id ?
                  (
                    (dateTo === 0 && dateFrom === 0) ? <div key={el.id}>
                      <img
                        alt="runner-icon"
                        style={{ cursor: "pointer" }}
                        onClick={() => { editModalOpen(el.id) }}
                        src='/images/runner-icon.png'
                      />
                      <div className='jogs-card'>
                        <div>{new Date(+el.date * 1000).toLocaleDateString()}</div>
                        <div><span>Speed: </span> 15</div>
                        <div><span>Distance: </span> {el.distance} km</div>
                        <div><span>Time: </span>{el.time} min</div>
                      </div>
                    </div>
                      : ((dateFrom <= el.date * 1000) && (dateTo >= el.date * 1000)) ? <div key={el.id}>
                        <img
                          alt='runner-icon'
                          style={{ cursor: "pointer" }}
                          onClick={() => { editModalOpen(el.id) }}
                          src='/images/runner-icon.png'
                        />
                        <div className='jogs-card'>
                          <div>{new Date(+el.date * 1000).toLocaleDateString()}</div>
                          <div><span>Speed: </span> 15</div>
                          <div><span>Distance: </span> {el.distance} km</div>
                          <div><span>Time: </span>{el.time} min</div>
                        </div>
                      </div>
                        : ""
                  )
                  : "")}
              </div>
              <img alt='add-icon' onClick={() => setActive(true)} className="add" src='/images/add.png' />
            </div>
          </div> :
          <div className={'nothing_wrapper ' + (active ? "active" : "")}>
            <img alt='sad-icon' src='/images/sad-rounded.png' />
            <div>Nothing is there</div>
            <button onClick={() => { setActive(true) }}>Create your jog first</button>
          </div>
      }

    </div>
  )
})

export default Jogs;