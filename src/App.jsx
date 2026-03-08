import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Customizer from './pages/Customizer.jsx'
import Compose from './pages/Compose.jsx'
import Share from './pages/Share.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/customize" element={<Customizer />} />
                <Route path="/compose" element={<Compose />} />
                <Route path="/share" element={<Share />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
