import React from 'react'
import { NavLink ,Link} from 'react-router-dom'

export default function Navbar() {
    return (
        <div className='navbar-full'>
            <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary  ">
                <div className="container-fluid navbar-full">
                    <Link className="navbar-brand " to="/"><div className="nav-head"> BookCritic</div></Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users/signup">SignUp</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/users/login">Login</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/books/post">Post a Book</NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
