import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

function Header({page}) {
    
    return (
        <div className="hearderContainer">
            <header>
                <div className="goHome">
                    {page == "view" ?
                    <Link to="/">
                        <FontAwesomeIcon icon={faChevronLeft}/>
                    </Link> :
                    ""}
                </div>
                <div>공공임대주택 조회</div>
            </header>
        </div>
    );
}

export default Header;