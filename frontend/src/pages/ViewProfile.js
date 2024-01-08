/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ViewProfile() {
  const [searchingUser, setSearchingUser] = useState({});
  const [loggedInUser, setLoggedInUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [usernameFromStorage, setUsernameFromStorage] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");
  const showText = showAll ? 'Hide' : 'Show All';
  const visibleData = followers.slice(0, 5);
  const [visibleFollowers, setVisibleFollowers] = useState([]);
  const [role, setRole] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const searchUserByUsername = window.localStorage.getItem("searchUserByUsername");
      setUsernameFromStorage(window.localStorage.getItem("username"));

      if (searchUserByUsername) {
        try {
          const [followersResponse, postsResponse, profileResponse] = await Promise.all([
            axios.get(`/followers/${searchUserByUsername}`),
            axios.get(`/posts/${searchUserByUsername}`),
            axios.get(`/profile/${searchUserByUsername}`)
          ]);

          setFollowers(followersResponse.data);

          const sortedPosts = postsResponse.data.sort((postA, postB) => {
            const dateA = new Date(postA.date).getTime();
            const dateB = new Date(postB.date).getTime();
            return dateB - dateA;
          });
          setPosts(sortedPosts);

          setSearchingUser(profileResponse.data);
        } catch (error) {
          navigate("/*");
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Username not found in local storage");
      }
    };

    fetchData();
    setRole(window.localStorage.getItem("role"))



  }, []); // Removed usernameFromStorage from the dependency array

  useEffect(() => {
    // visibleFollowers'ı güncelle
    if (showAll) {
      setVisibleFollowers(followers);
    } else {
      setVisibleFollowers(followers.slice(0, 5));
    }
  }, [showAll, followers]);



  const isFollowing = () => {


    // Check if the current user is in the list of followers
    const result = followers.some((follower) => {

      return follower.username === usernameFromStorage;
    });

    return result;
  };

  const followUser = async () => {
    window.location.reload(false)

    try {
      if (isFollowing()) {
        // If already following, perform unfollow action
        await axios.delete(`/followers/${usernameFromStorage}/unfollow/${searchingUser.username}`);
        console.log(`You unfollowed ${searchingUser.username}`);
      } else {
        // If not following, perform follow action
        await axios.post(`/followers/${usernameFromStorage}/follow/${searchingUser.username}`);
        console.log(`You are now following ${searchingUser.username}`);
      }
    } catch (error) {
      console.error("Error following/unfollowing user:", error);
    }
  };


  const calculateTimeDifference = (postDate) => {
    const now = new Date();
    const postTime = new Date(postDate);
    const difference = now.getTime() - postTime.getTime();

    const seconds = Math.floor(difference / 1000);

    if (seconds < 60) {
      return `${seconds} seconds ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} minutes ago`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      return `${hours} hours ago`;
    } else if (seconds < 604800) {
      const days = Math.floor(seconds / 86400);
      return `${days} days ago`;
    } else {
      const weeks = Math.floor(seconds / 604800);
      return `${weeks} weeks ago`;
    }
  };







  const handleFollowerClick = (follower) => {
    window.localStorage.setItem("searchUserByUsername", follower)
    if (follower === usernameFromStorage) {
      navigate("/profile")
    } else {
      window.location.reload(false)
    }


  };
  return (
    <div className="grid grid-cols-3 h-screen">
      {/* Left Part (2/3 of the screen) */}
      <div className="col-span-2 p-5 border-r border-gray-300">
        <div>
          <h1 className="p-3 pl-9 text-3xl font-bold">{searchingUser.fname} {searchingUser.lname}</h1>
        </div>
        <div className="pt-6 flex justify-start gap-8 pl-6">
          <a
            className={`text-slate-500 hover:text-black cursor-pointer ${activeLink === "Home" && !showAll ? "border-b-2 border-black" : ""
              }`}
            onClick={() => {
              setActiveLink("Home");
              setShowAll(false);
            }}
          >
            Home
          </a>
          <a
            className={`text-slate-500 hover:text-black cursor-pointer ${activeLink === "About" && !showAll ? "border-b-2 border-black" : ""
              }`}
            onClick={() => {
              setActiveLink("About");
              setShowAll(false);
            }}
          >
            About
          </a>
          {showAll ? (
            <a className="text-white bg-slate-700 p-1 rounded-md item-center">Followers</a>
          ) : (
            null
          )}
        </div>
        <hr />
        {showAll ? (
          <ul className="list-disc pl-4 pt-8 ">
            {followers.map((follower, index) => (
              <li key={index} onClick={() => handleFollowerClick(follower.username)} className="mb-2 cursor-pointer ">
                {follower.username}
              </li>
            ))}
          </ul>
        ) : (
          <br />
        )}
        {activeLink === "About" ? (
          <div className="pl-4 pt-8">
            {searchingUser.about ? searchingUser.about : 'No information available'}
          </div>
        ) : <br />}

        {!showAll && activeLink === "Home" && (
          <div className="p-4" >
            {posts.map((post) => (
              <article key={post.postId} className="flex max-w-xl flex-col items-center p-4 justify-between bg-slate-100 rounded-xl">
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                </div>
                <div className="flex justify-between pt-4 w-full ">
                  <a href="#">{post.user?.username} </a>
                  <h1 className="text-slate-600 ">{calculateTimeDifference(post.sharingDate)}</h1>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* Right Part (1/3 of the screen) */}
      <div className="col-span-1 p-4">
        <div>
          <div className="flex justify-between items-center">
           <img
              className="h-16 w-16 rounded-full"
              alt=""
              src="https://pbs.twimg.com/media/DBtlktyXcAATi3S.jpg"
            ></img> 
           
            {/* {role === "ADMIN" ? <FaRegTrashAlt className="text-red-600 text-2xl" /> : null} */}
          </div>

          <h1 className="pt-4 text-xl font-bold">{searchingUser.fname} {searchingUser.lname}</h1>
          <p className="text-slate-500">{followers.length} followers </p>
          <button
            onClick={followUser}
            className={`px-2 py-2 cursor-pointer rounded-md ${isFollowing() ? 'text-red-600 bg-red-100' : 'text-green-600 bg-green-100'
              }`}
          >
            {isFollowing() ? 'Unfollow' : 'Follow'}
          </button>

        </div>
        <div className="pt-8 pb-4">
          <h1 className="text-xl">Followers</h1>
          <ul className="list-disc pl-4 pt-8">
            {visibleData.map((follower, index) => (
              <li key={index} onClick={() => handleFollowerClick(follower.username)} className="mb-2 cursor-pointer">
                {follower.username}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <a
            onClick={() => setShowAll(!showAll)}
            className="px-2 py-2 cursor-pointer text-green-600 rounded-md"
          >
            {showText} ({followers.length})
          </a>
        </div>
      </div>
    </div>
  );
}
