import React, {Component} from 'react'
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    const { apps } = this.props

    const list = apps.map((app, index) => {
      return (
        <li key={index} className="px-2">
          <NavLink
            className={({ isActive }) => `block rounded my-1 py-1 px-2 text-slate-900 hover:bg-slate-50 border-l-2 border-transparent ${isActive ? "font-semibold border-purple-400" : "blue"}`}
            to={`/${app.id}`} key={app.id}>{app.name}</NavLink>
        </li>
      )
    })

    return (
      <section>
        <ul>
          {list}
        </ul>
      </section>
    )
  }
}

export default Sidebar
