import { useState } from 'react'
import './App.css';
import Api from './api'


function App() {
  const [state, setState] = useState({
    username: '',
    repositories: []
  })
  const fetchRepositories = () => {
    Api().get(`/users/${state.username}/repos`)
    .then(success => {
      if (success && success.request && success.request.status === 200) {
        setState({ ...state, repositories: success.data})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Github repository finder using username</h1>
        <div className="input-container">
        <input className="text-input" value={state.username} onChange={(e) => {
          const { value } = e.target
          setState({ ...state, username: value })
        }} placeholder="username" />
        <button className={state.username.length > 0 ? "button": "button-disabled"} disabled={!state.username.length > 0} onClick={() => fetchRepositories()}>Submit</button>
        </div>
        {
          state.repositories.map((item, key) => {
            return (
              <div className="repo-card" key={key}>
              <p>Repository: <b>{item.full_name}</b></p>
              <p>Click to open repository </p>
              <a href={item.html_url} target="_blank" rel="noreferrer noopener">{item.html_url}</a>
            </div>
            )
          })
        }
      </header>
    </div>
  );
}

export default App;
