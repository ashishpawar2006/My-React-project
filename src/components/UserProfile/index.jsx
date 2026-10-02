import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useParams} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import LoaderComponent from '../LoaderComponent'

const UserProfile = () => {
  const {userId} = useParams()
  const apiUrl = `https://apis.ccbp.in/insta-share/users/${userId}`
  const jwtToken = Cookies.get('jwt_token')

  const [isLoading, setIsLoading] = useState(true)

  const [profileInfo, setProfileInfo] = useState({
    followersCount: 0,
    followingCount: 0,
    id: '',
    posts: [],
    postsCount: 0,
    profilePic: '',
    stories: [],
    userBio: '',
    userId: '',
    userName: '',
  })

  console.log(isLoading)

  useEffect(() => {
    const makeApiCall = async () => {
      const option = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }

      const response = await fetch(apiUrl, option)
      const fetchedData = await response.json()

      const formattedData = {
        followersCount: fetchedData.user_details.followers_count,
        followingCount: fetchedData.user_details.following_count,
        id: fetchedData.user_details.id,
        posts: fetchedData.user_details.posts.map(each => ({
          id: each.id,
          imageUrl: each.image,
        })),
        postsCount: fetchedData.user_details.posts_count,
        profilePic: fetchedData.user_details.profile_pic,
        stories: fetchedData.user_details.stories.map(each => ({
          id: each.id,
          imageUrl: each.image,
        })),
        userBio: fetchedData.user_details.user_bio,
        userId: fetchedData.user_details.user_id,
        userName: fetchedData.user_details.user_name,
      }
      console.log(formattedData)
      setProfileInfo(formattedData)
      setIsLoading(false)
    }

    makeApiCall()
  }, [apiUrl, jwtToken])

  const {
    followersCount,
    followingCount,
    postsCount,
    profilePic,
    stories,
    userName,
    userBio,
  } = profileInfo

  const myprofileStoriesFunction = (imageUrl, id) => (
    <div key={id}>
      <img src={imageUrl} alt="profile-stories" className="profile-stories" />
    </div>
  )

  return (
    <div className="myprofile-container">
      <Header />

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <main className="myprofile-content">
          <section className="myprofile-info-section">
            <img src={profilePic} alt={userName} className="profileImage" />

            <div className="myprofile-info-container">
              <h1 className="myprofile-username">{userName}</h1>

              <div className="profile-details">
                <p>{postsCount} posts</p>
                <p>{followersCount} followers</p>
                <p>{followingCount} following</p>
              </div>
            </div>

            <p>{userBio}</p>
          </section>

          <section className="profile-stories-container">
            {stories.map(eachObj =>
              myprofileStoriesFunction(eachObj.imageUrl, eachObj.id),
            )}
          </section>

          <section className="posts-heading-container">
            <h2>▦ Posts</h2>
          </section>

          <section className="profile-posts-container">
            {profileInfo.posts.map(eachPost => (
              <img
                key={eachPost.id}
                src={eachPost.imageUrl}
                alt="post"
                className="profile-post-image"
              />
            ))}
          </section>
        </main>
      )}
    </div>
  )
}

export default UserProfile
