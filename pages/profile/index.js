import dynamic from "next/dynamic";
import {DotPulse} from '@uiball/loaders'
import {Vortex} from 'react-loader-spinner'

const Index = () => {
    const Profile = dynamic(() => import('../../components/Profile'), {
        loading: () => <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
    })
    return (
        <>
            <Profile/>
        </>
    )
}

export default Index