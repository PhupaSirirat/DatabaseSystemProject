import './Style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className='content'>
            <div className='title'>
                <h1 className='title'>Game management system</h1>
            </div>
            <hr></hr>
            <div className='boxcontain'>
                <Link className='link' to={"/App"}>
                    <div className='box'>
                        <b className='boxtitle'>
                            Games
                        </b>
                    </div>
                </Link>
                <Link className='link' to={"/allservers"}>
                    <div className='box'>
                        <b className='boxtitle'>
                            Servers
                        </b>
                    </div>
                </Link>
                <Link className='link' to={"/accounts"}>
                    <div className='box'>
                        <b className='boxtitle'>
                            Accounts
                        </b>
                    </div>
                </Link>
                <Link className='link' to={"/server-locations"}>
                    <div className='box'>
                        <b className='boxtitle'>
                            Server Locations
                        </b>
                    </div>
                </Link>
                <Link className='link' to={"/players"}>
                    <div className='box'>
                        <b className='boxtitle'>
                            Players
                        </b>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;