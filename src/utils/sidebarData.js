import matches from '../../assets/sidebarIcons/profileMatch.png'
import girl from '../../assets/sidebarIcons/girl.png'
import search from '../../assets/sidebarIcons/search.svg'
import heart from '../../assets/sidebarIcons/heart.png'
import messages from '../../assets/sidebarIcons/messenger.png'
import eye from '../../assets/sidebarIcons/interest.png'
import Matches from '../components/matches/matches'
import NewAndOnline from '../components/newAndOnline/newAndOnline'
export const sidebarData=[
    {id:'1',image:matches,title:'Matches',components:Matches},
    {id:'2',image:girl,title:'New and Online',components:NewAndOnline},
    {id:'3',image:search,title:'Search'},
    // {id:'4',image:rocket,title:'Interest Booster',image1:rocket},
    {id:'4',image:heart,title:'Likes You'},
    // {id:'5',image:messages,title:'Messages',image1:messages,link:'/mainContent/allMessages'},
    {id:'5',image:messages,title:'Messages'},
    {id:'6',image:eye,title:'Visitors'},    
]