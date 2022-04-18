import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";

import { SidebarData } from './SidebarData'

import { IconContext } from 'react-icons/lib';

import '../style/navbar.css'

function Navbar() {
	const [userlist, setUserlist] = useState([]);

	const [loginUsername, setLoginUsername] = useState("")

	userlist.filter(user => user.username == loginUsername)
		.map((val, key) => {
			return (
				<div key={key} className="crud-list">
					<Link to={`/profile/${val.id}`}><h1>{val.username}</h1></Link>
				</div>
			)
		})


	useEffect(() => {
		axios.get("http://localhost:3000/login") //1
			.then((response) => {
				setLoginUsername(response.data.user[0].username);
			});

		axios.get(`http://localhost:3001/getAllId/`)
			.then((response) => {
				setUserlist(response.data);
			})

	}, [])

	const [sidebar, setSidebar] = useState(false);

	const showSidebar = () => {
		setSidebar(!sidebar)
	}

	return (
		<>
			<IconContext.Provider value={{ color: 'white' }}>
				<div className="topbar">
					<div className='navbar'>
						{userlist.filter(user => user.username == loginUsername)
							.map((val, key) => {
								return (
									<div key={key} className="crud-list">
										<Link to={`/profile/${val.id}`}><h1>{val.username}</h1></Link>
									</div>
								)
							})}
						<Link to='#' className='menu-bars'>
							<FaIcons.FaBars onClick={showSidebar} />
						</Link>
					</div>
				</div>
				<nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
					<ul className='nav-menu-items' onClick={showSidebar}>
						<li className='navbar-toggle'>
							<Link to="#" className='menu-bars'>
								<AiIcons.AiOutlineClose />
							</Link>
						</li>
						{SidebarData.map((item, index) => {
							return (
								<li key={index} className={item.cName}>
									<Link to={item.path}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</nav>
			</IconContext.Provider>
		</>
	)
}

export default Navbar