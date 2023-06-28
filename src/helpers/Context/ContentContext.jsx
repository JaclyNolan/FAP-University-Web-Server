import { createContext, useContext } from 'react'

const ContentContext = createContext({
    isContentLoading: false,
    setContentLoading: () => {}
})

export default ContentContext;