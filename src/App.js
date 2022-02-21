import React, {Component} from 'react'
import './App.css';
import Sidebar from './Sidebar';
import { Outlet, Link } from "react-router-dom";

class App extends Component {

  state = {
    apps: [{
      name: 'URL Parser',
      id: 'url-parser'
    }, {
      name: 'Email',
      id: 'email'
    }, {
      name: 'JSON formatter',
      id: 'json'
    }, {
      name: 'UNIX Time',
      id: 'unix-time'
    }, {
      name: 'Markdown',
      id: 'markdown'
    }]
  }

  // Code is invoked after the component is mounted/inserted into the DOM tree.
  componentDidMount() {
    console.log('app mounted')

    //let [searchParams] = useSearchParams();

    //console.log('param', searchParams.get('q'))

    const url =
      'https://en.wikipedia.org/w/api.php?action=opensearch&search=Seona+Dancing&format=json&origin=*'

    fetch(url)
      .then((result) => result.json())
      .then((result) => {
        this.setState({
          data: result,
        })
      })
  }

  render() {
    const { apps } = this.state

    return (
      <div className="App">

        <header className="sticky top-0 backdrop-blur border-b border-slate-900/10 bg-white/95 supports-backdrop-blur:bg-white/60">
          <div className="lg:container flex justify-between items-center py-4">
            <div className="">
              <Link to="/" className="text-xl">Devloper 🤪</Link>
            </div>
            <div className="">
              <a href="https://github.com/AndreiIgna/devloper" target="_blank" rel="noreferrer" className="rounded py-1 px-2 hover:bg-slate-100">GitHub</a>
            </div>
          </div>
        </header>

        <div className="">
          <div className="fixed top-[4rem] left-0 w-[200px] overflow-y-auto">
            <Sidebar apps={apps} addApp={this.addApp} />
          </div>
          <div className="ml-[200px] bg-gray-50 p-4">
            <Outlet />
          </div>
        </div>

      </div>
    );
  }

  addApp = (app) => {
    const {apps} = this.state

    this.setState({
      apps: [...apps, app]
    })
  }
}

export default App;
