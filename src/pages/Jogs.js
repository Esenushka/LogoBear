import React, { useMemo, useState } from 'react'
import Api from '../api/api'
import AddForm from '../components/AddForm'
import EditForm from '../components/EditForm'

const Jogs = React.memo(({ dateFrom, dateTo, activeBurger }) => {
  const data = JSON.parse(localStorage.getItem("data"))
  const [jogs, setJogs] = useState([])
  const [added, setAdded] = useState(0);
  const [active, setActive] = useState(false)
  const [editJog, setEditJog] = useState({})
  const [editActive, setEditActive] = useState(false)
  const [user, setUser] = useState({})

  // First way to make request
  const getAllSync = async () => {
    try {
      const res = await Api.getAllSync()
      setJogs(res.data.response.jogs)
    } catch (error) {
      console.log(error);
    }
  }

  useMemo(() => getAllSync(), [added]);

  useMemo(() => {
    // Second way to make request
    Api.getAllUser()
      .then(res => setUser(res.data.response))
  }, [])

  const edit = (e) => {
    e.preventDefault()
    Api.putJog(editJog)
    setAdded(added + 1)
    setEditActive(false)
  }
  const editModalOpen = (el) => {
    let yourDate = new Date(el.date * 1000);
    const offset = yourDate.getTimezoneOffset()
    yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
    const date = yourDate.toISOString().split('T')[0]
    setEditJog({ ...el, date: date,jog_id: el.id })
    setEditActive(true)
  }
  return (

    <div>
      <AddForm
        data={data}
        setActive={setActive}
        active={active}
        added={added}
        setAdded={setAdded} />
      <EditForm
        setEditActive={setEditActive}
        editJog={editJog}
        setEditJog={setEditJog}
        edit={edit} editActive={editActive}
      />
      {
        jogs.some((item) => { return item.user_id === user.id })
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
                        onClick={() => { editModalOpen(el) }}
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
                          onClick={() => { editModalOpen(el) }}
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