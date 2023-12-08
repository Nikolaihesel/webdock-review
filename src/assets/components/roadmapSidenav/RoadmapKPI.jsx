import { useEffect } from 'react'
import { usePostManagement } from '../../../services/PostManagement'

function RoadmapKPI() {
    const {fetchPostsWithStatus, fetchedPosts} = usePostManagement();
   
  return (
    <div>
        {fetchedPosts.map((post) => {
            <div>
                key={post._id}
                title={post.title}
            </div>
        })}
    </div>

  )
}

export default RoadmapKPI