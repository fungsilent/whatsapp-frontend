import Link from 'next/link'

const Header = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link href='/'>Home</Link>
                </li>
                <li>
                    <Link href='/post/create'>Create Post</Link>
                </li>
                <li>
                    <Link href='/about-us'>About us</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Header
