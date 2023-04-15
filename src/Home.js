import './Style/Home.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Home() {
    return (
        <main>
            <div className='content'>
                <div className='title'>
                    <h1 className='title'>Content management system</h1>
                </div>
                <hr></hr>
                <div className='boxcontain'>
                    <Link className='link' to={"/App"}>
                        <div className='box'>
                            <b className='boxtitle'>
                                All games
                            </b>
                        </div>
                    </Link>
                    <Link className='link' to={"/"}>
                        <div className='box'>
                            <b className='boxtitle'>
                                All servers
                            </b>
                        </div>
                    </Link>
                    <Link className='link' to={"/accounts"}>
                        <div className='box'>
                            <b className='boxtitle'>
                                All accounts
                            </b>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default Home;