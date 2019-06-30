import React from 'react';
import Menu from "./Menu";

const Layout = ({
                    title = 'Title',
                    description = 'Description',
                    className,
                    children
                }) => {
    return (
        <div>
            <Menu/>
            <section className="hero is-light">
                <div className="hero-body">
                    <div className="container">
                        <h1 className="title is-capitalized">
                            {title}
                        </h1>
                        <h2 className="subtitle">
                            {description}
                        </h2>
                    </div>
                </div>
            </section>
            <div className={className} style={{justifyContent: 'center'}}>{children}</div>
        </div>

    );
};

export default Layout;
