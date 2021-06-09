import React from 'react'

const Navbar = ({ navigationLinks,onClickNav})=>(
    <nav>
        <ul className={"linksUl"}>
            {navigationLinks.map((link)=>(
                <li className={"links"} onClick={onClickNav(link)}>
                    {link}
                </li>))}
        </ul>
    </nav>
)

export default Navbar