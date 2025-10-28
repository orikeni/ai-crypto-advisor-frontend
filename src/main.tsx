import { createRoot } from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Layout from './components/LayoutArea/layout/Layout.tsx'
import { store } from './Redux/store.ts'
import { interceptor } from './Utils/Interceptor.ts'
import { Toaster } from 'react-hot-toast'

interceptor.create();

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 

        <Provider store={store}> 
            <Layout />
            <Toaster position="top-right" reverseOrder={false} />
        </Provider>

    </BrowserRouter>
)
