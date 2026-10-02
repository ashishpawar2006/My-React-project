import './index.css'
import {Link} from 'react-router-dom'

const Stories = props => {
  const {storiesDetails} = props
  const {storyUrl, userId, userName} = storiesDetails
  return (
    <Link to={`/users/${userId}`} className="story-link">
      <div className="stories-card-container">
        <img src={storyUrl} alt={userName} className="stories-image" />
        <h1 className="stories-heading">{userName}</h1>
      </div>
    </Link>
  )
}

export default Stories
