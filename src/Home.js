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
                    <div className='box'>
                        <b className='boxtitle'>
                            <Link className='link' to={"/App"}>All games</Link>
                        </b>
                    </div>
                    <div className='box'>
                        <b className='boxtitle'>
                            <Link className='link' to={"/"}>All servers</Link>
                        </b>
                    </div>
                    <div className='box'>
                        <b className='boxtitle'>
                            <Link className='link' to={"/"}>All players</Link>
                        </b>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Home;