import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"
import Home from './pages/Home.jsx'
import Builder from './pages/Builder.jsx'
import Customizer from './pages/Customizer.jsx'
import Compose from './pages/Compose.jsx'
import Share from './pages/Share.jsx'
import Garden from './pages/Garden.jsx'
import Collection from './pages/Collection.jsx'
import Coffee from './pages/Coffee.jsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/builder" element={<Builder />} />
                <Route path="/customize" element={<Customizer />} />
                <Route path="/compose" element={<Compose />} />
                <Route path="/share" element={<Share />} />
                <Route path="/coffee" element={<Coffee />} />
                <Route path="/garden" element={<Garden />} />
                <Route path="/collection" element={<Collection />} />
            </Routes>
            <Analytics />
        </BrowserRouter>
    )
}

export default App
