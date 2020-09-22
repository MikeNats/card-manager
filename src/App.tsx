import React from 'react'
import CardContainer from './view/Cards/CardContainer/CardContainer'
import ErrorBoundary from './view/common/ErrorBoundary/ErrorBoundary'

const App = () =>
  <section className="app" >
    <React.StrictMode>
      <ErrorBoundary>
        <CardContainer/>
      </ErrorBoundary>
    </React.StrictMode>
  </section>

export default App
 