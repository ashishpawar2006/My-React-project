import './index.css'
import Loader from 'react-loader-spinner'

const LoaderComponent = () => (
  <div className="loader-conatiner">
    <Loader
      type="TailSpin"
      height="50"
      width="50"
      color="#4094ef"
      ariaLabel="Loading"
    />
  </div>
)

export default LoaderComponent
