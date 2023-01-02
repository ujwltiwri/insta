import dynamic from "next/dynamic";
import {DotWave} from '@uiball/loaders'
import {Vortex} from 'react-loader-spinner'

const Index = () => {
    const Profile = dynamic(() => import('../../components/Profile'), {
        loading: () => <div className='load' aria-live="polite">
            <DotWave size={100} color={'#7EAF97'}/>
        </div>
    })
    return (
        <>
            <Profile/>
        </>
    )
}

export default Index