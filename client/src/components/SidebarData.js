import React from 'react';

import * as Bs from "react-icons/bs";
import * as Fa from "react-icons/fa";

/*
	Affichage dans la barre de navigation vertical
*/
export const SidebarData = [
	{
		title: 'Accueil',
		path: '/',
		icon: <Fa.FaHome />,
		cName: 'nav-text'
	},
	{
		title: 'Films',
		path: '/Movie',
		icon: <Bs.BsCameraReelsFill />,
		cName: 'nav-text'
	},
	{
		title: 'Séries',
		path: '/TV',
		icon: <Bs.BsTvFill />,
		cName: 'nav-text'
	},
	{
		title: 'Utilisateurs',
		path: '/userlist',
		icon: <Fa.FaUser />,
		cName: 'nav-text'
	}
]