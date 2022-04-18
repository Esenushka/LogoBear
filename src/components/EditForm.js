
export default function EditForm(
    {
        edit, setEditedDate,
        setEditActive, setEditedDistance,
        setEditedTime, editActive,
        editedDate, editedDistance, editedTime
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
                        value={editedDistance}
                        required
                        onChange={(el) => { setEditedDistance(el.target.value) }}
                        type={"number"}
                    />

                </div>
                <div>
                    <div>Time</div>
                    <input
                        value={editedTime}
                        required
                        onChange={(el) => { setEditedTime(el.target.value) }}
                        type={"number"}
                    />
                </div>
                <div>
                    <div>Date</div>
                    <input value={editedDate}
                        required
                        onChange={(el) => { setEditedDate(el.target.value) }}
                        type={"date"}
                    />
                </div>
                <button>Save</button>
            </form>
        </div>
    )
}
