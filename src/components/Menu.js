import React, { Component } from 'react'

export default class Menu extends Component {
    render() {
        return (
            <div>
                {/* Main Sidebar Container */}
                <aside className="main-sidebar sidebar-dark-primary elevation-4">
                    {/* Brand Logo */}
                    <a href="index3.html" className="brand-link">
                        {/*<img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{ opacity: '.8' }} />*/}
                        <span className="brand-text font-weight-light">Projet AWI</span>
                    </a>
                    {/* Sidebar */}
                    <div className="sidebar">
                        {/* SidebarSearch Form */}
                        <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                                <div className="input-group-append">
                                    <button className="btn btn-sidebar">
                                        <i className="fas fa-search fa-fw" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Sidebar Menu */}
                        <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                                {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-th" />
                                        <p>
                                            Page 1
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-copy" />
                                        <p>
                                            Page 2
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-chart-pie" />
                                        <p>
                                            Page 3
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">Title</li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon far fa-calendar-alt" />
                                        <p>
                                            Page 4
                                        </p>
                                    </a>
                                </li>
                                <li className="nav-header">MISCELLANEOUS</li>
                            </ul>
                        </nav>
                        {/* /.sidebar-menu */}
                    <div>
                    <strong>Copyright © 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong>
                    All rights reserved.
                    <div>
                        <b>Version</b> 3.1.0
                    </div>
                    </div>
                    {/* /.sidebar */}
                </div>
                </aside>

            </div>
        )
    }
}
