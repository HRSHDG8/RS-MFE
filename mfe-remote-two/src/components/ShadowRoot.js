import { createTheme, ThemeProvider, Box } from '@mui/material'
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'
import root from 'react-shadow';
import React from 'react'
const theme = createTheme({});

const ShadowRoot = ({ children }) => {

    const rootRef = React.useRef(null)
    const [cache, setCache] = React.useState(null)

    React.useEffect(() => {
        setTimeout(() => {
            if (!cache) {
                const elem = document.getElementById('shadow-root-foot')
                setCache(createCache({
                    key: 'misc',
                    prepend: true,
                    insertionPoint: rootRef.current,
                    container: rootRef.current
                }))
            }
        }, 10)
    }, [])

    return (
        <root.div mode='open'>
            <Box id='shadow-root-foot' ref={rootRef}>
                {cache && <>

                    <CacheProvider value={cache}>
                        <ThemeProvider theme={theme}>
                            {children}
                        </ThemeProvider>
                    </CacheProvider>
                </>
                }
            </Box>
        </root.div>
    )
}

export default ShadowRoot