import About from "../components/Pages/About/About";
import Login from "../components/Pages/Login/Login";
import PostIdPage from "../components/Pages/PostIdPage/PostIdPage";
import Posts from "../components/Pages/Posts/Posts";

export const privateRoutes = [
    {path:'/about',component: About, exact: true},
    {path:'/posts',component: Posts, exact: true},
    {path:'/posts/:id',component: PostIdPage, exact: true},
]

export const publicRoutes = [
    {path:'/login',component: Login, exact: true},

]