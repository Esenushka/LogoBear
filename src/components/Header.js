import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function Header({ setDateTo, setDateFrom, activeBurger, setActiveBurger }) {
    const location = useLocation()
    const [active, setActive] = useState(false)

    const cleanFilter = () => {
        setActive(!active)
        setDateFrom(0)
        setDateTo(0)
    }
    return (
        <div>
            <div className={"header_wrapper " + ((active && location.pathname === "/jogs") ? "active" : "")} >
                <header>
                    <div className='container'>
                        <div className='header_left-block'>
                            <img src='/images/logo.png' alt='logo' />
                            <span>LOGOBEAR</span>
                        </div>
                        <div className={'header_right-block ' + (location.pathname === "/" ? "active" : "")}>
                            <div className="pages_wrapper">
                                <NavLink className="pages" to="/jogs" ><div>JOGS</div></NavLink>
                                <NavLink className="pages" to="/info"><div>INFO</div></NavLink>
                                <NavLink className="pages" to="/contact"><div>CONTACT US</div></NavLink>
                            </div>
                            <div className="burger">
                                <svg
                                    onClick={() => setActiveBurger(!activeBurger)}
                                    className={"ham hamRotate ham4 " + (activeBurger ? " active" : "")}
                                    viewBox="0 0 100 100"
                                    width="50"
                                >
                                    <path
                                        className="line top"
                                        d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
                                    ></path>
                                    <path className="line middle" d="m 70,50 h -40"></path>
                                    <path
                                        className="line bottom"
                                        d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
                                    ></path>
                                </svg>
                            </div>

                            <button className={"filter-btn " + (location.pathname !== "/jogs" ? "active" : "")}
                                disabled={location.pathname === "/jogs"
                                    ? false : true} onClick={cleanFilter}>
                                <img
                                    className={"filter-img " + ((active && location.pathname === "/jogs")
                                        ? "active" : "")} src={(active && location.pathname === "/jogs")
                                            ? "/images/filter-active.png" : '/images/filter.png'}
                                />
                            </button>
                        </div>
                    </div>

                </header>
                <div className={'filter-block ' + ((active && location.pathname === "/jogs") ? "active" : "")}>
                    <div>
                        Date from
                        <input onChange={(el) => setDateFrom(new Date(el.target.value).getTime())} type={"date"} />
                    </div>
                    <div>
                        Date to
                        <input onChange={(el) => setDateTo(new Date(el.target.value).getTime())} type={"date"} />
                    </div>
                </div>
            </div>
            <div className="burger_wrapper">
                <div className={"burger_modal " + (activeBurger ? "active" : "")}>
                    <NavLink onClick={() => { setActiveBurger(false) }} className="pages" to={"/jogs"}><div>JOGS</div></NavLink>
                    <NavLink onClick={() => { setActiveBurger(false) }} className="pages" to={"/info"}><div>INFO</div></NavLink>
                    <NavLink onClick={() => { setActiveBurger(false) }} className="pages" to={"/contact"}><div>CONTACT US</div></NavLink>

                </div>
            </div>
        </div>
    )
}
