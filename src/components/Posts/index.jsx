import './index.css'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'

const Posts = props => {
  const {postsData} = props
  const {
    comments,
    createdAt,
    likesCount,
    postDetails,
    profilePic,
    userName,
  } = postsData
  const {caption, imageUrl} = postDetails

  const postCommentFunction = (comment, commentUserName, userId) => (
    <p key={userId}>
      <span className="comment-username">{commentUserName},</span> {comment}
    </p>
  )
  return (
    <div className="posts-card-container">
      <div className="post-header-container">
        <img src={profilePic} alt={userName} className="profile-image" />
        <h3 className="profile-heading"> {userName} </h3>
      </div>
      <img src={imageUrl} alt={userName} className="posts-image" />
      <div className="profile-icons-container">
        <BsHeart size={20} />
        <FaRegComment size={20} />
        <BiShareAlt size={20} />
      </div>
      <div className="post-info-container">
        <p className="post-like"> {likesCount}, Likes</p>
        <p className="post-caption">{caption}</p>
        <p className="post-hours">{createdAt}</p>
        {comments.map(eachObj =>
          postCommentFunction(
            eachObj.comment,
            eachObj.userName,
            eachObj.userId,
          ),
        )}
      </div>
    </div>
  )
}

export default Posts
