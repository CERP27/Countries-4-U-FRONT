import './App.css'

import { useEffect } from 'react'
import {Routes , Route , useLocation , useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'

import axios from 'axios'

import { getCountries, getActivities } from './redux/countrySlice';
import LandingPage from './components/landingPage'
import HomePage from './components/homePage'
import DetailPage from './components/detaiPage'
import NavBar from './components/navBar'
import ActivityForm from './components/activityForm'
import BadRoute from './components/badRoute'

function App() {
  
  const {pathname} = useLocation()

  const dispatch = useDispatch()

  const URL = 'https://countries-4-u-back-production.up.railway.app/countries'

  const URLA = 'https://countries-4-u-back-production.up.railway.app/activities'

  useEffect(()=>{
    const getallCountriesAndActivities= async()=>{
        try {
          const {data} = await axios(URL)
          dispatch(getCountries(data))
    
          const res= await axios(URLA)
          dispatch(getActivities(res.data))
            
        }catch (error) {
          throw error.message
        }
    }
    getallCountriesAndActivities();

  },[])

  return (
    <div >

      {pathname!=='/' ? <NavBar/>:''}

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<HomePage/>}/>
        <Route path='/details/:id' element={<DetailPage/>}/>
        <Route path='/activity' element={<ActivityForm/>}/>
        <Route path='*' element={<BadRoute/>}/>
      </Routes>

    </div>
  )
}

export default App
