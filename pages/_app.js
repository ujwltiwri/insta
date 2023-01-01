import '../styles/globals.css'
import '../components/Sidebar/style.css'
import '../components/Login/style.css'
import '../components/Feed/style.css'
import '../components/Profile/style.css'
import '../components/Navbar/style.css'
import AuthWrapper from '../context/auth'
import {NotificationsProvider} from 'reapop'

export default function App({Component, pageProps}) {
    return (
        <AuthWrapper>
            <Component {...pageProps} />
        </AuthWrapper>
    )
}
