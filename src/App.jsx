import { Header, Sidebar, Backdrop } from "./components/common"
import classes from './App.module.scss'
import { Routes, Route } from 'react-router-dom'
import ScreenLoader from "./components/common/ScreenLoader/ScreenLoader";
import AuthContext from './helpers/Context/AuthContext';
import { useEffect, useState } from "react";
import { useMediaQuery, useUser } from "./helpers/hooks";
import { adminRouters, commomRouters, instructorRouters, staffRouters, studentRouters } from "./helpers/constants";
const findRouter = (role) => {
  switch (role){
    case "Admin":
      return adminRouters
    case "Staff":
      return staffRouters
    case "Instructor":
      return instructorRouters
    case "Student":
      return studentRouters
    default:
      return commomRouters
  }
}

function App() {
  const user = useUser()
  const isMobileView = useMediaQuery("(max-width: 850px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobileView);
  const [isShowBackdrop, setIsShowBackdrop] = useState(false)

  useEffect(() => {
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
    if (isSidebarOpen) {
      return 'sidebar'
    }
    return 'header'
  }
  const backdropClick = () => {
    setIsSidebarOpen(false)
    setIsShowBackdrop(false)
  }

  console.log('Rendering App.jsx');

  return user.isFetching
    ? <ScreenLoader />
    : (<AuthContext.Provider value={{ user: user }}>
      {isShowBackdrop && <Backdrop parentComponent={getBackdropParent()} backdropClick={backdropClick} />}
      <main className={classes['main']}>
        {user.token && <Sidebar sidebarStyle={sidebarStyle} />}
        <div className={classes['main-container']}>
          {user.token && <Header onToggleSidebar={onToggleSidebar} />}
          <div className={classes['main-main']}>
            <Routes>
              {findRouter(user.user && user.user.role).map((routeItem, index) => {
                return <Route path={routeItem.path} key={index} element={routeItem.render()} />
              })}
            </Routes>
          </div>
        </div>
      </main>
    </AuthContext.Provider>)
}

export default App;
