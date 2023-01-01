import Head from 'next/head'
import {useContext} from 'react'
import {AuthContext} from '../context/auth'
import dynamic from "next/dynamic";
import {DotPulse} from "@uiball/loaders";
import {Vortex} from "react-loader-spinner";

// import Feed from "../components/Feed";

export default function Home() {
    const {user} = useContext(AuthContext)
    const Feed = dynamic(() => import('../components/Feed'), {
        loading: () => <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center'}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
        />
    })
    return (
        <>
            <Head>
                <title>Instagram - Reels App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link
                    href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
                    rel="stylesheet"/>
            </Head>
            <Feed/>
        </>
    )
}
