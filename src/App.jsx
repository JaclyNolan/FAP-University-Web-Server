import Login from "./components/Pages/Login/Login";
import {Header, Sidebar} from "./components/common"
import useUser from "./helpers/hooks/useUser";
import classes from './App.module.scss'
import {Routes, Route} from 'react-router-dom'
import {routers} from './helpers/constants'
import ScreenLoader from "./components/common/ScreenLoader/ScreenLoader";
import AuthContext from './helpers/Context/AuthContext';
function App() {
  const user = useUser()
  return user.isFetching ? <ScreenLoader/> : (<AuthContext.Provider value={{user: user}}>
    <main className={classes['main']}>
      {user.user && <Header/>}
      <div className={classes['main-container']}>
      {user.user &&  <Sidebar/>}
        <div className={classes['main-main']}>
          <Routes>
            {routers.map((routeItem, index) => {
              return <Route path={routeItem.path} key={index} element={routeItem.render()}/>
            })}
          </Routes>
        </div>
      </div>
    </main>
  </AuthContext.Provider>)
}

export default App;
