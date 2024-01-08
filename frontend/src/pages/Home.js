/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaComment } from "react-icons/fa";




 
  export default function Home() {
    const [posts, setPosts] = useState([]);
    const [searchUserByUsername, setSearchingUserByUsername] = useState('');
    const navigate=useNavigate();

    useEffect(() => {

      axios.get(`/posts`)
        .then(res => {
          const sortedPosts = res.data.sort((postA, postB) => {
            // Tarihleri karşılaştırarak sıralama yapın
            const dateA = new Date(postA.sharingDate).getTime();
            const dateB = new Date(postB.sharingDate).getTime();
            return dateB - dateA; // En yeni tarih en üstte olacak şekilde sırala
          });
          
          setPosts(sortedPosts);
          
        })
        .catch(error => {
          console.error("Error fetching posts:", error);
        });
    }, [])

    function handleAuthorClick(e,searchUserByUsername) {
      e.preventDefault();
      window.localStorage.setItem("searchUserByUsername",searchUserByUsername)
      const username=window.localStorage.getItem("username")
      if(searchUserByUsername===username){
        console.log('deneme')
        navigate("/profile")
      }else{
        navigate("/viewProfile")
      }
      
    }

    function handlePostClick(e,postId) {
      e.preventDefault();
      window.localStorage.setItem("searchingPost",postId)
      navigate("/viewPost")      
    }
  const calculateTimeDifference = (postDate) => {
    const now = new Date();
    const postTime = new Date(postDate);
    const difference = now.getTime() - postTime.getTime();
    
    // Milisaniyeleri saniyeye dönüştür
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
  }
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-lg leading-8 text-gray-600">
            Son teknoloji haberleri ve trendleri yakından takip edin.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article key={post.id} className="flex max-w-xl flex-col items-center p-4 justify-between bg-slate-100  rounded-xl">
                
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <a onClick={(e) => handlePostClick(e, post.postId)} href={post.href}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">{post.content}</p>
                </div>
                 <div className="flex justify-between pt-4 w-full ">
                    <a  onClick={(e) => handleAuthorClick(e, post.user.username)} href="#">{post.user.username} </a>
                    <div className="flex justify-between items-center gap-4 " >
                      <div className="flex justify-between items-center gap-2">
                      <FaComment className="text-slate-400"/>
                        {post.comment_count}
                      </div>
                      <h1 className="text-slate-600 ">{calculateTimeDifference(post.sharingDate)}</h1>
                      
                    </div>
                    
                 </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    )
  }
  