import { useState, useEffect } from "react";

import "./testdata.css";

import PostMarkup from "../assets/components/PostMarkup";
function TestBackend() {
  const myUser = {
    email: "someemail.edu.dk",
    id: "821022",
    name: "Nikolai",
  };

  const postStatus = "under review";

  const [title, setTitle] = useState("");
  const [featureStatus, setFeatureStatus] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState("");
  const [upvotes, setUpvotes] = useState(0);

  // create post, send database
  const submitForm = async (e) => {
    e.preventDefault();

    const post = {
      title,
      featureStatus,
      bodyText,
      user,
      upvotes,
    };

    const response = await fetch("http://localhost:4000/api/posts/", {
      method: "POST",
      body: JSON.stringify(post),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setBodyText("");
      setFeatureStatus("");
      setUser({});
      setUpvotes(0);

      console.log("new post added");
    }
  };

  // get posts
  const [fetchedPosts, setFetchedPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:4000/api/posts");
      const json = await response.json();

      if (response.ok) {
        setFetchedPosts(json);
        console.log(fetchedPosts);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="test-data">
      <div className="form-data-wrapper">
        <div className="form-wrapper">
          <form onSubmit={submitForm} className="test-form">
            <input
              className="test-input "
              type="text"
              name="title"
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />

            {title}

            {/* //skal udskiftes med  <selcect/> */}
            <input
              className="test-input "
              type="text"
              name="featureStatus"
              placeholder="Status"
              onChange={(e) => setFeatureStatus(e.target.value)}
              value={featureStatus}
            />

            <textarea
              className="test-input "
              type="text"
              name="bodyText"
              placeholder="Text"
              onChange={(e) => setBodyText(e.target.value)}
              value={bodyText}
            />

            <input
              className="test-input "
              type="text"
              name="featureStatus"
              placeholder="Status"
              value={myUser.name}
            />

            <input
              className="test-input "
              type="number"
              name="upvotes"
              placeholder="Status"
              onChange={(e) => setUpvotes(e.target.value)}
              value={upvotes}
            />

            <button>Submit</button>
            {error}
          </form>
        </div>

        <div className="data-wrapper">
          {fetchedPosts &&
            fetchedPosts.map((post) => (
              <PostMarkup
                key={post.id}
                title={post.title}
                description={post.bodyText}
                status={post.featureStatus}
                upvotes={post.upvotes}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default TestBackend;
