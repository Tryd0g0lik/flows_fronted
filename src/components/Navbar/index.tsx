import React, { useEffect, useState } from 'react';
import './style.scss';
// import { MenuFC } from '../Menu';
// import { getCookie } from 'src/service/cookiesService';

export function NavbarFC({children}: Readonly<{children:React.ReactNode}> ): React.JSX.Element {
    
    return (
        <>
            <header className="navbar bg-base-100 shadow-sm">
                {children}
                <div className="navbar-end">
                    
                </div>
            </header>
        </>
    );
}
