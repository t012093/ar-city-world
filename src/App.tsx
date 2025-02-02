import { ServerSelection } from './components/ServerSelection'
import styled from 'styled-components'

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
  padding: 2rem;
`

function App() {
  return (
    <AppContainer>
      <ServerSelection />
    </AppContainer>
  )
}

export default App
