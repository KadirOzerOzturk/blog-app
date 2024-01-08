/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import { FaRegTrashAlt } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { FaComment } from "react-icons/fa";



export default function ViewPostDetails() {
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const [commentCount, setCommentCount] = useState(0);
  
  const [comments, setComments] = useState([]);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const navigate = useNavigate();
  const postId = window.localStorage.getItem("searchingPost");
  const [usernameFromStorage, setUsernameFromStorage] = useState("");
  const [updateClick, setUpdateClick] = useState(false);

  const [role, setRole] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/comments/allComments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchData();
    setRole(window.localStorage.getItem("role"));
    setUsernameFromStorage(window.localStorage.getItem("username"));
  }, [postId]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`/posts/getpostbyid/${postId}`)
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    }
    fetchData();
    getCommentCount()
  }, [postId]);
  async function getCommentCount() {
    try {
     await axios.get(`/posts/${postId}/comment-count`).then((res)=> setCommentCount(res.data))
      
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }



  function handleAuthorClick(e, searchUserByUsername) {
    e.preventDefault();
    window.localStorage.setItem("searchUserByUsername", searchUserByUsername);
    const username = window.localStorage.getItem("username");
    if (searchUserByUsername === username) {
      navigate("/profile");
    } else {
      navigate("/viewProfile");
    }
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

  const handleSaveClick = async (e) => {
    e.preventDefault();

    const username = window.localStorage.getItem("username");
    try {
      await axios.post(`/comments/saveComment`, {
        username: username,
        postId: postId,
        content: content,
      });
    } catch (error) {
      console.error("Error fetching post:", error);
    }
    window.location.reload(false);
  };

  const handleCommentDelete = async (commentId) => {
    await axios.delete(`/comments/delete/${commentId}`).then(() => {
      window.location.reload(false);
    });
  };

  const handlePostDelete = async () => {
    await axios.delete(`/posts/delete/${postId}`).then(() => {
      navigate("/");
    });
  };

  const handleUpdateClick = async () => {
    const username = window.localStorage.getItem("username");
    await axios
      .put(`/comments/update/${selectedCommentId}`, {
        commentId:selectedCommentId,
        username: username,
        postId: postId,
        content: commentContent,
        
      })
      .then(() => {
        console.log(`comment updated. comment id : ${postId}`);
        setUpdateClick(false);
        setSelectedCommentId(null);
        window.location.reload(false);
      });
  };

  const handleUpdateIconClick = (commentId) => {
    setSelectedCommentId(commentId);
    setUpdateClick(true);
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-4 md:mb-0 w-full mx-auto relative">
          <div className="px-4 lg:px-0 flex justify-between items-center">
            <h2 className="text-4xl font-semibold text-gray-800 leading-tight ">
              {post.title}
            </h2>
            {role === "ADMIN" ? (
              <FaRegTrashAlt
                className="text-2xl hover:text-red-600 cursor-pointer"
                onClick={handlePostDelete}
              />
            ) : null}
            <h1 className="text-slate-600 ">
              {calculateTimeDifference(post.sharingDate)}
            </h1>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-12">
          <div className="px-4 lg:px-0 mt-12 text-gray-700 text-lg leading-relaxed w-full lg:w-3/4">
            {post.content}
          </div>
          <div className="w-full lg:w-1/4 m-auto mt-12 max-w-screen-sm">
            <div className="p-4 border-t border-b md:border md:rounded">
              <div className="flex py-2">
                <img
                  src="https://randomuser.me/api/portraits/men/97.jpg"
                  className="h-10 w-10 rounded-full mr-2 object-cover"
                  alt="User"
                />
                <div>
                  {post.user && (
                    <>
                      <p
                        onClick={(e) =>
                          handleAuthorClick(e, post.user.username)
                        }
                        className="cursor-pointer font-semibold text-gray-700 text-sm"
                      >
                        {post.user.fname} {post.user.lname}
                      </p>
                      <p className="font-semibold text-gray-600 text-xs">
                        {post.user.role ? post.user.role.name : ""}
                      </p>
                    </>
                  )}
                </div>
              </div>
              {post.user && post.user.about && (
                <p className="text-gray-700 py-3">
                  {post.user.about.length >= 100
                    ? `${post.user.about.substring(0, 100)}...`
                    : null}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex  items-center gap-2">
                      <FaComment className="text-slate-400"/>
                        {commentCount}
                      </div>
        <div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-1">
            {comments.map((comment) => (
              <article
                key={comment.commentId}
                className="flex max-w-xl flex-col items-start p-4 justify-between bg-slate-100  rounded-xl"
              >
                <div className="flex justify-between gap-14 items-center">
                  <h3 className="mt-3 w-2/3  text-lg font-semibold leading-6 text-gray-900 cursor-pointer">
                    {comment.content}
                  </h3>
                  {comment.user.username === usernameFromStorage ? (
                    <GoPencil
                      className="text-2xl"
                      onClick={() => handleUpdateIconClick(comment.commentId)}
                    />
                  ) : null}
                  {role === "ADMIN" ? (
                    <FaRegTrashAlt
                      className="text-2xl hover:text-red-600 cursor-pointer"
                      onClick={() => handleCommentDelete(comment.commentId)}
                    />
                  ) : null}
                </div>
                <div className="flex justify-between pt-4 w-full">
                  <a
                    onClick={(e) => handleSaveClick(e)}
                    href="#"
                  >
                    {comment.user.username}
                  </a>
                  <h1 className="text-slate-600 ">
                    {calculateTimeDifference(comment.commentDate)}
                  </h1>
                </div>
              </article>
            ))}
          </div>
        </div>
        {selectedCommentId !== null ? (
          <div className="w-1/2 pt-40">
            <div className="mt-2">
              <p className="flex justify-end text-slate-400">{`Char Count: ${content.length}/255`}</p>
              <textarea
                onChange={(e) => setCommentContent(e.target.value)}
                id="comment"
                name="comment"
                rows={10}
                maxLength={3000}
                className="block w-full h-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              <button
                onClick={handleUpdateClick}
                type="button"
                className="rounded-md items-end bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 hover:text-white"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div className="w-1/2 pt-40">
            <div className="mt-2">
              <p className="flex justify-end text-slate-400">{`Char Count: ${content.length}/255`}</p>
              <textarea
                onChange={(e) => setContent(e.target.value)}
                id="comment"
                name="comment"
                rows={10}
                maxLength={3000}
                className="block w-full h-24 rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                defaultValue={""}
              />
              <button
                onClick={handleSaveClick}
                type="button"
                className="rounded-md items-end bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 hover:text-white"
              >
                Share
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
