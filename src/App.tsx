import React, { FC } from 'react'
import Login from './Components/Login/Login';
import Home from './pages/Home';
const App: FC = () => {
  const [getToken, setGetToken] = React.useState<string | null>('')
  React.useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')
    if (!token && hash) {
      token = hash.split('&')[0].split('=')[1]
      window.location.hash = ""
      window.localStorage.setItem('token', token)
    }
    setGetToken(token)
  }, [])
  return (
    <div className="wrapper__flex">
      {getToken ? <Home code={getToken} /> : <Login />}
    </div>
  );
}

export default App;
