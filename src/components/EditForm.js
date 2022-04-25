import React from "react";

export default React.memo(function EditForm(
    {
        edit, editActive, setEditActive, editJog, setEditJog
    }) {

    return (
        <div>
            <form className={'form_modal ' + (editActive ? "active" : "")} onSubmit={edit}>
                <div className='form_close-btn'>
                    <img alt='cancel' onClick={() => setEditActive(false)} src='/images/cancel.png' />
                </div>
                <div>
                    <div>Distance</div>
                    <input
                        value={editJog.distance || 0}
                        required
                        onChange={(el) => { setEditJog({ ...editJog, distance: el.target.value }) }}
                        type={"number"}
                    />

                </div>
                <div>
                    <div>Time</div>
                    <input
                        value={editJog.time || 0}
                        required
                        onChange={(el) => { setEditJog({ ...editJog, time: el.target.value }) }}
                        type={"number"}
                    />
                </div>
                <div>
                    <div>Date</div>
                    <input value={editJog.date || "1970-01-01"}
                        required
                        onChange={(el) => { setEditJog({ ...editJog, date: el.target.value }) }}
                        type={"date"}
                    />
                </div>
                <button>Save</button>
            </form>
        </div>
    )
})
