import React from 'react';

import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri"
import * as CgIcons from "react-icons/cg"

export const SidebarData = [
	{
		title: 'Home',
		path: '/',
		icon: <AiIcons.AiFillHome />,
		cName: 'nav-text'
	},
	{
		title: 'Movie',
		path: '/Movie',
		icon: <RiIcons.RiMovie2Line />,
		cName: 'nav-text'
	},
	{
		title: 'TV',
		path: '/TV',
		icon: <RiIcons.RiMovie2Line />,
		cName: 'nav-text'
	}
]