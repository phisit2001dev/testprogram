import EditForm from './components/EditForm'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import Index from './index';
function App() {
  return (  
    <>
    <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/editform/:id" element={<EditForm />} />
    </Routes>
    </>

  )
}

export default App
