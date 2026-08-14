import BeatLoader from 'react-spinners/BeatLoader'
import {useState, useEffect} from 'react'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const CowinDashboard = () => {
  const [state, setState] = useState({
    apiStatus: apiStatusConstants.initial,
    vaccinationData: {},
  })

  useEffect(() => {
    const getVaccinationData = async () => {
      setState(prev => ({
        ...prev,
        apiStatus: apiStatusConstants.inProgress,
      }))

      const covidVaccinationDataApiUrl =
        'https://apis.ccbp.in/covid-vaccination-data'

      const response = await fetch(covidVaccinationDataApiUrl)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const updatedData = {
          last7DaysVaccination: fetchedData.last_7_days_vaccination.map(
            eachDayData => ({
              vaccineDate: eachDayData.vaccine_date,
              dose1: eachDayData.dose_1,
              dose2: eachDayData.dose_2,
            }),
          ),
          vaccinationByAge: fetchedData.vaccination_by_age.map(range => ({
            age: range.age,
            count: range.count,
          })),
          vaccinationByGender: fetchedData.vaccination_by_gender.map(
            genderType => ({
              gender: genderType.gender,
              count: genderType.count,
            }),
          ),
        }
        setState({
          vaccinationData: updatedData,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        setState(prev => ({...prev, apiStatus: apiStatusConstants.failure}))
      }
    }
    getVaccinationData()
  }, [])

  const renderFailureView = () => (
    <div className="failure-view">
      <img
        className="failure-image"
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  const renderVaccinationStats = () => {
    const {vaccinationData} = state

    return (
      <>
        <VaccinationCoverage vaccinationCoverageDetails={vaccinationData} />
        <VaccinationByGender vaccinationByGenderDetails={vaccinationData} />
        <VaccinationByAge vaccinationByAgeDetails={vaccinationData} />
      </>
    )
  }

  const renderLoadingView = () => (
    <div className="loading-view" data-testid="loader">
      <BeatLoader color="#ffffff" size={80} />
    </div>
  )

  const renderViewsBasedOnAPIStatus = () => {
    const {apiStatus} = state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderVaccinationStats()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  return (
    <div className="app-container">
      <div className="cowin-dashboard-container">
        <div className="logo-container">
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1 className="logo-heading">Co-WIN</h1>
        </div>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        {renderViewsBasedOnAPIStatus()}
      </div>
    </div>
  )
}

export default CowinDashboard
