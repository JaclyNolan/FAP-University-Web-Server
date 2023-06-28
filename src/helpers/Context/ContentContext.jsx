import { createContext } from 'react'

const ContentContext = createContext({
    isContentLoading: false,
    setContentLoading: () => {}
})

export default ContentContext;