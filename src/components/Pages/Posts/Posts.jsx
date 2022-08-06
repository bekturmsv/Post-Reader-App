
import React, { useState, useRef, useMemo, useEffect } from 'react';  
import PostService from '../../../API/PostService';
import PostFilter from '../../PostFilter/PostFilter';
import PostForm from '../../PostForm/PostForm';
import PostList from '../../PostList/PostList';
import MyButton from '../../UI/button/MyButton';
import Loader from '../../UI/Loader/Loader';
import MyModal from '../../UI/MyModal/MyModal';
import Pagination from '../../UI/Pagination/Pagination';
import { useFetching } from '../../../hooks/useFetching/useFetching';
import { usePosts } from '../../../hooks/usePosts/usePosts';
import { getPageCount, getPagesArray } from '../../../Utils/Pages';
import { useObserver } from '../../../hooks/useObserver/useObserver';
import MySelect from '../../UI/Select/MySelect';

function Posts() {
  
  const [posts,setPosts] = useState([])

  const [filter,setFilter] = useState({sort:'',query:''})
  const [modal, setModal] = useState(false)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort,filter.query)
  const lastElement = useRef()
  console.log(lastElement);

  const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
    const response = await PostService.getAll(limit,page);
    setPosts([...posts,...response.data])
    const totalCount = response.headers['x-total-count'];
    setTotalPages(getPageCount(totalCount,limit))
  })

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1)
  })

  useEffect(() => {
    fetchPosts(limit,page)
  },[page, limit])

 const createPost = (newPost) => {
    setPosts([...posts,newPost])
    setModal(false)
 }


//  Получаем пост из дочернего элемента
 const removePost = (post) => {
setPosts(posts.filter( p => p.id !== post.id))
 }

 const changePage = (page) => {
  setPage(page)

 }


  return (
    <div className="App">
      <MyButton  style={{marginTop:"30px"}} onClick={() => setModal(true)}>
        Создать пользователя
      </MyButton>
     <MyModal visible={modal} setVisible={setModal}>
     <PostForm create={createPost}/>
     </MyModal>

      {/* Управляемый компонент */}
     <hr style={{margin:'15px 0'}}/>
     <PostFilter filter ={filter} setFilter={setFilter} />
     {postError && 
        <h1>Произошла ошибка ${postError}</h1> 
     }
     <MySelect
     value={limit}
     onChange={value => setLimit(value)
     }
     defaultValue = "Количество элементов на странице"
     options={[
      {value:5,name:'5'},
      {value:10,name:'10'},
      {value:25,name:'25'},
      {value:-1,name:'Показать все'},


     ]}
     />
     <PostList posts={sortedAndSearchedPosts} title = "Посты с Jsonplaceholder" remove={removePost}/>
     <div ref={lastElement} style={{height:20}}></div>
     {isPostsLoading &&
      <div style={{display:"flex",justifyContent:"center", marginTop:"50px"}}> <Loader/> </div> 
     }
     <Pagination page = {page} changePage={changePage} totalPages={totalPages} />
    </div>
  );
}

export default Posts;
