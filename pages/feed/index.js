// import Feed from '../../components/Feed'

import dynamic from "next/dynamic";
import {DotPulse} from "@uiball/loaders";

const Index = () => {
    const Feed = dynamic(() => import('~components/Feed'), {
        loading: () => <div className='load'><DotPulse size={235} color="black"/></div>
    })
    return (
        <>
            <Feed/>
        </>
    )
}

export default Index
