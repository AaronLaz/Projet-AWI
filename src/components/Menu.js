import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="/mercurial" className="brand-link">
                        {/*<img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />*/}
                        <span className="brand-text font-weight-light">Projet AWI</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item">
                                    <a href="/mercurial" className="nav-link">
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Mercuriale
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/listeallergenes" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Liste Allergènes
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/fichetechniques" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Fiches Techniques
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="/labels" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Etiquettes
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">Finances</li>
                                <li className="nav-item">
                                    <a href="/couts" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Couts
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    {/* /.sidebar */}
                </div>
                </aside>

            </div>
        )
    }
}
