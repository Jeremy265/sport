import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import App from './app'
import store from './store/store'
import './assets/scss/style.scss'
import config from './config'

export type IRootState = ReturnType<typeof store.getState>

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
    <Provider store={store}>
        <BrowserRouter basename={config.basename}>
            <App />
        </BrowserRouter>
    </Provider>
)
