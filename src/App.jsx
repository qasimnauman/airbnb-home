// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import ListingSection from './components/ListingSection';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <SearchBar />
      <ListingSection title="Popular homes in Lahore" />
      <ListingSection title="Available next month in Islamabad" />
    </div>
  )
}

export default App
