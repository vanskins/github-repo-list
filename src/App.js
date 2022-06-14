import { useState } from 'react'
import moment from 'moment'
import './App.css';
import Api from './api'


function App() {
  const [state, setState] = useState({
    repo: '',
    repositories: [],
    isLoading: false
  })
  const fetchRepositories = () => {
    setState({ ...state, isLoading: true})
    Api().get(`/search/repositories?q=${state.repo}`)
    .then(success => {
      if (success && success.request && success.request.status === 200) {
        setState({ ...state, repositories: success.data.items, isLoading: false})
      }
    })
    .catch(err => {
      console.log(err)
      setState({ ...state, isLoading: false})
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
        <button className={state.repo.length > 0 ? "button": "button-disabled"} disabled={!state.repo.length > 0} onClick={() => fetchRepositories()}>{state.isLoading ? "LOADING ...":"SUBMIT"}</button>
        </div>
      </header>
      <div className="repo-container">
      {
          state.repositories.map((item, key) => {
            return (
            <a href={item.html_url} target="_blank" rel="noreferrer noopener" className="repo-card" key={key}>
              <img className="avatar" src={item.owner.avatar_url} alt={item.owner.avatar_url} width={100} />
              <span style={{ textAlign: "center", marginTop: '10px' }}><a style={{ fontWeight: "700", background: "teal", color: "white", padding: '5px', borderRadius: "50px", textDecoration: "none"}} href={item.owner.html_url} target="_blank" rel="noreferrer noopener">@{item.owner.login}</a></span>
              <p style={{ textAlign: 'center'}}>
                <span style={{ fontSize: '14px', fontWeight: '700', color: "white", borderRadius: '50px', padding: '5px', background: "black", marginRight: '2px'}}>FORKS ({item.forks})</span>
                <span style={{ fontSize: '14px', fontWeight: '700', color: "black", borderRadius: '50px', padding: '5px', background: "yellow"}}>STARS ({item.stargazers_count})</span>
              </p>
              <p><b>#{key+1}</b></p>
              <span>Repository: <b>{item.full_name}</b></span>
              <span style={{ fontSize: '14px', fontWeight: '600'}}>{moment(item.created_at).fromNow()}</span>
              {
                item.description &&
                <p>
                <span>
                <i>"{item.description}"</i>
                </span>
              </p>
              }
            </a>
            )
          })
        }
      </div>
    </div>
  );
}

export default App;
