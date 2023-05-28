import {Header, Sidebar, Backdrop} from "./components/common"
import classes from './App.module.scss'
import {Routes, Route} from 'react-router-dom'
import {routers} from './helpers/constants'
import ScreenLoader from "./components/common/ScreenLoader/ScreenLoader";
import AuthContext from './helpers/Context/AuthContext';
import { useEffect, useState } from "react";
import { useMediaQuery, useUser } from "./helpers/hooks";
function App() {
  const user = useUser()
  const isMobileView = useMediaQuery("(max-width: 850px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileView);
  const [isShowBackdrop, setIsShowBackdrop] = useState(false)

  useEffect(() =>{
    setIsSidebarOpen(!isMobileView)
  }, [isMobileView])

  const onToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
    setIsShowBackdrop((prev) => !prev)
  }
  const sidebarStyle = {
    left: isSidebarOpen ? '0%' : '-100%'
  }
  const getBackdropParent = () => {
    if(isSidebarOpen){
      return 'sidebar'
    }
    return 'header'
  }
  const backdropClick = () => {
    setIsSidebarOpen(false)
    setIsShowBackdrop(false)
  }
  return user.isFetching ? <ScreenLoader/> : (<AuthContext.Provider value={{user: user}}>
    {isShowBackdrop && <Backdrop parentComponent={getBackdropParent()} backdropClick={backdropClick}/>}
    <main className={classes['main']}>
      {user.user &&  <Sidebar sidebarStyle={sidebarStyle}/>}
      <div className={classes['main-container']}>
        {user.user && <Header onToggleSidebar = {onToggleSidebar}/>}
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
