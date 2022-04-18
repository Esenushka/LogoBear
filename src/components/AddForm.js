import React, { useState } from 'react'
import Api from '../api/api'

export default function AddForm({ active, setActive, added, setAdded, data }) {
    const [distance, setDistance] = useState(0)
    const [time, setTime] = useState(0)
    const [date, setDate] = useState("")

    const submit = (e) => {
        e.preventDefault()
        Api.post("data/jog", {
            'date': date,
            "time": time,
            "distance": distance,
        },
            {
                headers: { 'Authorization': `Bearer ${data.access_token}` }
            })
        setAdded(added + 1)
        setActive(false)
    }
    return (
        <div>
            <form className={'form_modal ' + (active ? "active" : "")} onSubmit={submit}>
                <div className='form_close-btn'><img alt='close-btn' onClick={() => { setActive(false) }} src='/images/cancel.png' /></div>
                <div>
                    <div>Distance</div>
                    <input required onChange={(el) => { setDistance(el.target.value) }} type={"number"} />

                </div>
                <div>
                    <div>Time</div>
                    <input required onChange={(el) => { setTime(el.target.value) }} type={"number"} />
                </div>
                <div>
                    <div>Date</div>
                    <input required onChange={(el) => { setDate(el.target.value) }} type={"date"} />
                </div>
                <button>Save</button>
            </form>
        </div>
    )
}