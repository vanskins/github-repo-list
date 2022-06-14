import { useState } from 'react'
import './App.css';
import Api from './api'


function App() {
  const [state, setState] = useState({
    repo: '',
    repositories: []
  })
  const fetchRepositories = () => {
    Api().get(`/search/repositories?q=${state.repo}`)
    .then(success => {
      console.log(success)
      if (success && success.request && success.request.status === 200) {
        setState({ ...state, repositories: success.data.items})
      }
    })
    .catch(err => {
      console.log(err)
    })
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Github repository finder</h1>
        <div className="input-container">
        <input className="text-input" value={state.repo} onChange={(e) => {
          const { value } = e.target
          setState({ ...state, repo: value })
        }} placeholder="repository name" />
        <button className={state.repo.length > 0 ? "button": "button-disabled"} disabled={!state.repo.length > 0} onClick={() => fetchRepositories()}>Submit</button>
        </div>
      </header>
      <div className="repo-container">
      {
          state.repositories.map((item, key) => {
            return (
            <div className="repo-card" key={key}>
              <p>Repository: <b>{item.full_name}</b></p>
              <p>Forks ({item.forks})</p>
              <p>Stars ({item.stargazers_count})</p>
              <p>Click to open repository </p>
              <a href={item.html_url} target="_blank" rel="noreferrer noopener">{item.html_url}</a>
            </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
