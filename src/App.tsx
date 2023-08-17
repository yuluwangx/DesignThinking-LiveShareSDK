import React, { useEffect, useRef, useState } from 'react'
import './App.css'
import { Container } from 'react-bootstrap'
import Login from '../src/pages/Login/login'
import HomeScreen from './pages/Face/HomeScreen'
import EmpathyMap from './pages/Empathy/EmpathyMap'
import * as microsoftTeams from '@microsoft/teams-js'
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
import { inTeams } from './utils/inTeams'
import StakeholderMap from './pages/Stakeholder/Stakeholder'


function App() {
  const startedInitializingRef = useRef(false)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (startedInitializingRef.current) return
    startedInitializingRef.current = true
    const initialize = async () => {
      try {
        console.log('App.js: initializing client SDK initialized')
        await microsoftTeams.app.initialize()
        microsoftTeams.app.notifyAppLoaded()
        microsoftTeams.app.notifySuccess()
        setInitialized(true)
      } catch (error) {
        console.error(error)
      }
    }

    if (inTeams()) {
      console.log('App.js: initializing client SDK')
      initialize()
    }
  })
  const appReady = (inTeams() && initialized) || !inTeams()

  return appReady ? (
    <BrowserRouter>
      <main>
        <Routes>
          <Route
            path="/homeScreen"
            element={
              // <AuthRoute>
              <HomeScreen />
              // </AuthRoute>
            }
          />
          
          <Route
            path="/stakeholdermap"
            element={
              // <AuthRoute>
              <StakeholderMap />
              // </AuthRoute>
            }></Route>

          <Route
            path="/empathymap"
            element={
              // <AuthRoute>
              <EmpathyMap />
              // </AuthRoute>
            }></Route>
          <Route
            path="/brainstorm"
            element={
              // <AuthRoute>
              <BrainstormPage />
              // </AuthRoute>
            }
          />
          <Route
            path="/live"
            element={
              // <AuthRoute>
              <LiveCanvasPage />
              // </AuthRoute>
            }
          />
          <Route
            path="/scenariomap"
            element={
              // <AuthRoute>
              <ScenarioMap />
              // </AuthRoute>
            }
          />
          <Route
            path="/*"
            element={
              // <AuthRoute>
              <HomeScreen />
              // </AuthRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  ) : null
}

export default App