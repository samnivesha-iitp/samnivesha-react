import Home from './home'
import Blog from './blog'
import Login from './login'
import Contact from './contact'
import Schedule from './schedule'
import About from './about'

const routes=[
    {
        path:'/',
        exact:true,
        component:Home,
    },
    {
        path:'/about',
        component:About

    },
    {
        path:'/blog',
        component:Blog
    },
    {
        path:'/contact',
        component:Contact
    },
    {
        path:'/login',
        component:Login
    },{
        path:'/schedule',
        component:Schedule
    }
]
export default routes