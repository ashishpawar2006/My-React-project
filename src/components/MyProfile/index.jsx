import {useState, useEffect} from 'react'
import {BsGrid3X3} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'
import Header from '../Header'
import LoaderComponent from '../LoaderComponent'

const MyProfile = () => {
  const apiUrl = 'https://apis.ccbp.in/insta-share/my-profile'
  const jwtToken = Cookies.get('jwt_token')

  const [isLoading, setIsLoading] = useState(true)
  const [profileInfo, setProfileInfo] = useState({
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    profilePic: '',
    posts: [],
    stories: [],
  })

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
        followersCount: fetchedData.profile.followers_count,
        followingCount: fetchedData.profile.following_count,
        id: fetchedData.profile.id,
        posts: fetchedData.profile.posts.map(each => ({
          id: each.id,
          imageUrl: each.image,
        })),
        postsCount: fetchedData.profile.posts_count,
        profilePic: fetchedData.profile.profile_pic,
        stories: fetchedData.profile.stories.map(each => ({
          id: each.id,
          imageUrl: each.image,
        })),
      }

      setProfileInfo(formattedData)
      setIsLoading(false)
    }

    makeApiCall()
  }, [apiUrl, jwtToken])

  const {followersCount, followingCount, postsCount, profilePic, stories} =
    profileInfo

  const userName = Cookies.get('user_name')

  const myprofileStoriesFunction = (imageUrl, id) => (
    <div key={id}>
      <img src={imageUrl} alt='profile-stories' className='profile-stories' />
    </div>
  )

  return (
    <div className='myprofile-container'>
      <Header />

      {isLoading ? (
        <LoaderComponent />
      ) : (
        <main className='myprofile-content'>
          <section className='myprofile-info-section'>
            <img src={profilePic} alt={userName} className='profileImage' />

            <div className='myprofile-info-container'>
              <h1 className='myprofile-username'>{userName}</h1>

              <div className='profile-details'>
                <p>{postsCount} posts</p>
                <p>{followersCount} followers</p>
                <p>{followingCount} following</p>
              </div>
            </div>
          </section>

          <section className='profile-stories-container'>
            {stories.map(eachObj =>
              myprofileStoriesFunction(eachObj.imageUrl, eachObj.id),
            )}
          </section>

          <section className='posts-heading-container'>
            <h2>
              <BsGrid3X3 /> Posts
            </h2>
          </section>

          <section className='profile-posts-container'>
            {profileInfo.posts.map(eachPost => (
              <img
                key={eachPost.id}
                src={eachPost.imageUrl}
                alt='post'
                className='profile-post-image'
              />
            ))}
          </section>
        </main>
      )}
    </div>
  )
}

export default MyProfile
