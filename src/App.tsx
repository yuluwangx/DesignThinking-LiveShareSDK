import React from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import Login from '../src/pages/Login/login'
import HomeScreen from './pages/Face/HomeScreen'
import EmpathyMap from './pages/Empathy/EmpathyMap'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom'
import { AuthRoute } from '../src/components/AuthComponent'
import ScenarioMap from './pages/Scenario/Scenario'
import BrainstormPage from '../src/pages/Sticker/BrainStormPage'
import { LiveCanvasPage } from './pages/Empathy/LiveCanvasPage'
function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/homeScreen"
            element={
              <AuthRoute>
                <HomeScreen />
              </AuthRoute>
            }
          />
          <Route
            path="/empathymap"
            element={
              <AuthRoute>
                <EmpathyMap />
              </AuthRoute>
            }></Route>
          <Route
            path="/brainstorm"
            element={
              <AuthRoute>
                <BrainstormPage />
              </AuthRoute>
            }
          />
          <Route
            path="/live"
            element={
              <AuthRoute>
                <LiveCanvasPage />
              </AuthRoute>
            }
          />
          <Route
            path="/scenariomap"
            element={
              <AuthRoute>
                <ScenarioMap />
              </AuthRoute>
            }
          />
          <Route
            path="/*"
            element={
              <AuthRoute>
                <HomeScreen />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
