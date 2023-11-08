import React from 'react'

//Components
import Post from './RoadmapPost'


function FeatureRequestContainer({title}) {

    const post = [{
    userID: "nikolai",
    title: "Dns shit",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
    
  }, {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
   {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
   {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
   {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
   {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
   {
   userID: "Bella",
    title: "noget om hunde",
    description: "noget om hvad der står og sådan noget",
    category: "Dns shit",
  },
]

  return (


    <div>
         <div className="feature-container">
        <h3 className="feature-titles">{title}</h3>
        

      {post.map((post, index) => (
        <div className="feature-request" key={index}>
            <p className="feature-post-user">{post.user}</p>
            <p className="feature-post-title">{post.title}</p>
            <p className="feature-post-desc">{post.description}</p>
            <p className="feature-post-catergory">{post.category}</p>

            <hr />

          </div>
      ))}
      </div>
    </div>
  )
}

export default FeatureRequestContainer