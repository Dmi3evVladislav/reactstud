import React, { useEffect, useState } from "react";
// import React, { useMemo, useState, useRef } from "react";
// import Counter from "./components/Counter";
// import ClassCounter from "./components/ClassCounter";
import '../styles/App.css'
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import MyModal from "../components/UI/MyModal/MyModal";
import MyButton from "../components/UI/button/MyButton";
import { usePosts } from "../hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import Pagination from "../components/UI/pagination/Pagination";



function Posts() {

  const [posts, setPosts] = useState([])

  // const [selectedSort, setSelectedSort] = useState('')
  // const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState({sort: '', query: ''})
  const [modal, setModal] = useState(false);

  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)

  const [totalPages, setTotalPages] = useState(0)
  const [limit] = useState(10)
  const [page, setPage] = useState(1)

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts(response.data)
    const totalCount = response.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
  })

  useEffect(()=> {
    fetchPosts()
  }, [page])


  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter(p => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }


  return (
    <div className="App">

      <MyModal title="Создать пост" visible={modal} setVisible={setModal}><PostForm create={createPost} /></MyModal>
      
      
      <PostFilter filter={filter} setFilter={setFilter} />
      <MyButton onClick={() => setModal(true)}>Создать пост</MyButton>

      <hr style={{margin: '15px 0'}}/>

      {postError && <h1>Произошла ошибка: {postError}</h1> }

      {isPostsLoading
        ? <div style={{display: "flex", justifyContent: "center", marginTop: "50px"}}>
            <Loader/>
          </div> 
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Посты про JS"/>
      }

      <hr style={{margin: '15px 0'}}/>

      {!isPostsLoading && <Pagination page={page} changePage={changePage} totalPages={totalPages} />}

    </div>
  );
}

export default Posts;
