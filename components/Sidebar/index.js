import {GrInstagram} from 'react-icons/gr'
import {AiFillHome} from 'react-icons/ai'
import {FiSearch} from 'react-icons/fi'
import {MdOutlineExplore} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import {AiOutlineHeart} from 'react-icons/ai'
import {VscDiffAdded} from 'react-icons/vsc'
import {CgProfile} from 'react-icons/cg'

const Index = () => {

    return (
        <>
            <ul className='menu'>
                <li className='item'><AiFillHome size='22px' /> Home</li>
                <li className='item'><FiSearch size='22px'/> Search </li>
                <li className='item'><MdOutlineExplore size='22px'/> Explore </li>
                <li className='item'><GrInstagram size='20px'/>Reels</li>
                <li className='item'> <RiMessengerLine size='22px'/>Messages</li>
                <li className='item'> <AiOutlineHeart size='22px'/>Notifications</li>
                <li className='item'> <VscDiffAdded size='22px'/>Create</li>
                <li className='item'> <CgProfile size='22px'/>Profile</li>
            </ul>
        </>
    )
}

export default Index