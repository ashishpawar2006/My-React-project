import './index.css'
import {useState, useEffect, useContext} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import LoaderComponent from '../LoaderComponent/index'
import Header from '../Header'
import Stories from '../Stories'
import SearchContext from '../../SearchContext'
import Posts from '../Posts'

const Home = () => {
  const [storiesList, setStoriesList] = useState([])
  const [postsList, setPostsList] = useState([])
  const storiesApiUrl = 'https://apis.ccbp.in/insta-share/stories'
  const postApiUrl = 'https://apis.ccbp.in/insta-share/posts'
  const [isStoriesLoading, setIsStoriesLoading] = useState(true)
  const [isPostLoading, setIsPostLoading] = useState(true)
  const setting = {
    dots: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: 500,
  }

  useEffect(() => {
    const apiCallFunction = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const option = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(storiesApiUrl, option)
      const fetchData = await response.json()
      const formattedData = fetchData.users_stories.map(eachData => ({
        storyUrl: eachData.story_url,
        userId: eachData.user_id,
        userName: eachData.user_name,
      }))
      setStoriesList(formattedData)
      setIsStoriesLoading(false)
    }
    apiCallFunction()
  }, [storiesApiUrl])

  useEffect(() => {
    const postApiCallFuction = async () => {
      const jwtToken = Cookies.get('jwt_token')
      const option = {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        method: 'GET',
      }
      const response = await fetch(postApiUrl, option)
      const fetchData = await response.json()
      const formattedPostList = fetchData.posts.map(eachData => ({
        createdAt: eachData.created_at,
        likesCount: eachData.likes_count,
        postDetails: {
          caption: eachData.post_details.caption,
          imageUrl: eachData.post_details.image_url,
        },
        postId: eachData.post_id,
        profilePic: eachData.profile_pic,
        userId: eachData.user_id,
        userName: eachData.user_name,

        comments: eachData.comments.map(eachComment => ({
          comment: eachComment.comment,
          userId: eachComment.user_id,
          userName: eachComment.user_name,
        })),
      }))
      setPostsList(formattedPostList)
      setIsPostLoading(false)
    }
    postApiCallFuction()
  }, [])

  const {searchInput} = useContext(SearchContext)

  const filterPostsList = postsList.filter(eachData =>
    eachData.postDetails.caption
      .toLowerCase()
      .includes(searchInput.toLowerCase()),
  )
  const notFoundPost = () => (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/mhv3tqhg/image/upload/v1790953245/Group.png"
        alt="post-not-found"
        className="not-found-post-img"
      />
      <h3 className="search-not-found-title">Search Not Found</h3>
      <p className="search-not-found-descreption">
        Try different keyword or search again
      </p>
    </div>
  )

  return (
    <div className="home-container">
      <Header />
      {isStoriesLoading ? (
        <LoaderComponent />
      ) : (
        <div className="stories-container">
          <Slider {...setting}>
            {storiesList.map(each => (
              <Stories key={each.userId} storiesDetails={each} />
            ))}
          </Slider>
        </div>
      )}
      {isPostLoading ? (
        <LoaderComponent />
      ) : (
        <div className="post-container">
          {filterPostsList.length === 0
            ? notFoundPost()
            : filterPostsList.map(eachData => (
                <Posts key={eachData.postId} postsData={eachData} />
              ))}
        </div>
      )}
    </div>
  )
}

export default Home
