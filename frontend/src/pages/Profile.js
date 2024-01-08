  /* eslint-disable jsx-a11y/anchor-is-valid */
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useNavigate } from "react-router";
  import { FaRegTrashAlt } from "react-icons/fa";

  export default function Profile() {
    const [followers, setFollowers] = useState([]);
    const [user, setUser] = useState([]);
    const [posts, setPosts] = useState([]);
    const [isVisible, setIsVisible] = useState(false); // for about form
    const [about, setAbout] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
      const username = window.localStorage.getItem("username");

      // Fetch Followers
      axios.get(`/followers/${username}`)
        .then(res => {
          setFollowers(res.data);
        })
        .catch(error => {
          console.error("Error fetching followers:", error);
        });

      axios.get(`/posts/${username}`)
        .then(res => {
          const sortedPosts = res.data.sort((postA, postB) => {
            const dateA = new Date(postA.date).getTime();
            const dateB = new Date(postB.date).getTime();
            return dateB - dateA;
          });
          
          setPosts(sortedPosts);
          console.log(res.data);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });

      axios.get(`/profile/${username}`)
        .then(res => {
          setUser(res.data);
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });


      if (user.about === null) {
        console.log(user.about, isVisible);
        setIsVisible(false);
        console.log(user.about, isVisible);
      }
      setRole(window.localStorage.getItem("role"))

    }, []);

    const handleLogout = () => {
      // localStorage'daki tüm verileri temizle
      window.localStorage.clear();
      window.location.reload(false)
      // Daha sonra giriş sayfasına yönlendirme yapabilirsiniz
      navigate('/login');
    };

    const handleSaveButton = () => {
      user.about = about;
      // Fetch Followers
      axios.put(`/update/${user.username}`, user)
        .then(
          window.location.reload(false)
        )
        .catch(error => {
          console.error(error);
        });
    };

    function handlePostClick(e,postId) {
      e.preventDefault();
      window.localStorage.setItem("searchingPost",postId)
      navigate("/viewPost")      
    }

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

    const handlePostDelete = async (postId) => {
      await axios.delete(`/posts/delete/${postId}`)
        .then(
          window.location.reload(false)

        )
              console.log(`Post deleted. Post id : ${postId}`);
    };

    const handlePostTitleClick = (postHref) => {
      
    };
    const handleFollowerClick = (follower) => {
      window.localStorage.setItem("searchUserByUsername",follower)
      navigate("/viewProfile")

    };
    

    const [showAll, setShowAll] = useState(false);
    const [activeLink, setActiveLink] = useState("Home");
    const showText = showAll ? 'Hide' : 'Show All';
    const visibleData =  followers.slice(0, 5);
    const [visibleFollowers, setVisibleFollowers] = useState([]);

    const navigate = useNavigate();

    return (
      <div className="grid grid-cols-3 h-screen">
        {/* Left Part (2/3 of the screen) */}
        <div className="col-span-2 p-5 border-r border-gray-300">
          <div>
            <h1 className="p-3 pl-9 text-3xl font-bold">{user.fname} {user.lname}</h1>
          </div>
          <div className="pt-6 flex justify-start gap-8 pl-6">
            <a
              className={`text-slate-500 hover:text-black cursor-pointer ${activeLink === "Home" && !showAll ? "border-b-2 border-black" : ""}`}
              onClick={() => {
                setActiveLink("Home");
                setShowAll(false);
              }}
            >
              Home
            </a>
            <a
              className={`text-slate-500 hover:text-black cursor-pointer ${activeLink === "About" && !showAll ? "border-b-2 border-black" : ""}`}
              onClick={() => {
                setActiveLink("About");
                setShowAll(false);
              }}
            >
              About
            </a>
            {showAll ? (
              <a className="text-white bg-slate-700 p-1 rounded-md">Followers</a>
            ) : (
              <></>
            )}
          </div>

          <hr />
          
          {activeLink === "About" ? (
            <div className="pl-4 pt-8">
              {user.about !== null ? (
                // Show about information
                user.about
              ) : (
                // Show about form
                <div className="border-b border-gray-900/10 pb-12 pr-24 pl-24 pt-16">
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    About yourself
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    This information will be displayed publicly so be careful what you share.
                  </p>
                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="col-span-full">
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        About
                      </label>
                      <div className="mt-2">
                      <p className='flex justify-end text-slate-400'> {`Char Count: ${about.length}`} /500 </p>
                        <textarea
                          onChange={(e) => setAbout(e.target.value)}
                          id="about"
                          name="about"
                          rows={10}
                          maxLength={3000}
                          className=" block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          defaultValue={""}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-gray-600">
                        Write a few sentences about yourself.
                      </p>
                    </div>
                    <button
                      onClick={handleSaveButton}
                      type="button"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 hover:text-white"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : null}
          
          {showAll ? (
            <ul className="list-disc pl-4 pt-8 ">
              {followers.map((follower, index) => (
                <li key={index}   onClick={() => handleFollowerClick(follower.username)} className="mb-2 cursor-pointer ">
                  {follower.username}
                </li>
              ))}
            </ul>
          ) : (
            <br />
          )}
          
          {!showAll && activeLink === "Home" && (
            <div className="p-4">
              {posts.map((post) => (
                <article
                  key={post.postId}
                  className="flex max-w-xl flex-col p-4 justify-between bg-slate-100 rounded-xl"
                >
                  <div onClick={(e) => handlePostClick(e, post.postId)} className="flex justify-between items-center">
                    <h3
                      className="mt-3 text-lg font-semibold leading-6 text-gray-900 cursor-pointer"
                      onClick={() => handlePostTitleClick(post.href)}
                    >
                      {post.title}
                    </h3>
                    <FaRegTrashAlt
                      className="text-xl hover:text-red-600 cursor-pointer"
                      onClick={() => handlePostDelete(post.postId)}
                    />
                  </div>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                  <div className="flex justify-between pt-4 w-full">
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
          <img
                className="h-16 w-16 rounded-full"
                alt=""
                src="https://pbs.twimg.com/media/DBtlktyXcAATi3S.jpg"
              ></img> 
            
            <h1 className="pt-4 text-xl font-bold">{user.fname} {user.lname}</h1>
            <p className="text-slate-500">{followers.length} followers</p>
            <div>
              <a onClick={() => navigate('/editProfile')} className="text-green-700 pr-6 pt-3 cursor-pointer">Edit Profile</a>
              <button onClick={handleLogout} className="rounded p-0.5 text-slate-100 bg-red-500">Logout</button>
            </div>
          </div>
          <div className="pt-8 pb-4">
            <h1 className="text-xl">Followers</h1>
            


    <ul className="list-disc pl-4 pt-8">
      {visibleData.map((follower, index) => (
        <li key={index}  onClick={() => handleFollowerClick(follower.username)} className="mb-2 cursor-pointer">
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
