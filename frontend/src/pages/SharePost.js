import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';


function SharePost(props) { 
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const navigate = useNavigate();
  const [username,setUsername]=useState("")
  const [textAreaCount, setTextAreaCount] = useState(0);



  useEffect(() => {
    setUsername(window.localStorage.getItem("username"))
  }, []);
  function sharePost() {
    console.log(username)
    axios.post("/posts/sharePost", {
      username: username,
      title: postTitle,
      content: postContent,
      
    })
      .then(response => {
        if (response.status === 200) {
          navigate("/");
          console.log('shared');
          // Basarili bildirimi
          
        }
      })
      .catch(error => {
        console.error("Request error: ", error);
        
      });
  }

  function handleShareClick(e) {
    e.preventDefault();
    sharePost();
  }
  const recalculate = e => {
    console.log("event value:", e);
    setTextAreaCount(e.target.value.length);
  };

  return (
    <>
    <div className="border-b border-gray-900/10 pb-12 pr-24 pl-24 pt-16">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            About your post
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Post Title
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                  onChange={(e) => setPostTitle(e.target.value)}
                    type="text"
                    name="title"
                    id="title"
                    autoComplete="title"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder="Title"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Content
              </label>
              <div className="mt-2">
              <p className='flex justify-end text-slate-400'> {`Char Count: ${postContent.length}`}/1000 </p>

                <textarea
                onChange={(e) => setPostContent(e.target.value)}
                  id="Content"
                  name="Content"
                  rows={10}
                    maxLength={3000}
                  className=" block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  defaultValue={""}
                  
                />
              </div>
               <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about your post.
              </p> 
            </div>

            <button
            onClick={handleShareClick}
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-green-700 hover:text-white"
                >
                  Share
                </button>

            
          </div>
        </div>

    
    </>
  )
}

export default SharePost