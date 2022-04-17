import { Link, useLocation } from "react-router-dom";

export default function Header() {
    const location = useLocation()
    return (
        <header>
            <div className='container'>
                <div className='header_left-block'>
                    <img src='/images/logo.png' alt='logo' />
                    <span>LOGOBEAR</span>
                </div>
                <div className={'header_right-block ' + (location.pathname === "/" ? "active" : "")}>
                    <Link to="/jogs"><div>JOGS</div></Link>
                    <Link to="/info"><div>INFO</div></Link>
                    <Link to="/contact-us"><div>CONTACT US</div></Link>
                    <img src="/images/filter.png" alt="filter-icon" />
                </div>
            </div>
        </header>
    )
}
