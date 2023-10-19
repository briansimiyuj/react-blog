import { useContext } from 'react'
import DataContext from './context/DataContext'
import Feed from './Feed'

const Home = () =>{

    const { results, fetchError, isLoading } = useContext(DataContext)

    return(

        <main className="Home">

            {isLoading && <p className="statusMsg">Loading posts....</p>}

            {!isLoading && fetchError && <p className="statusMsg" style={{color: "red"}}>{fetchError}</p> }

            {!isLoading && !fetchError && (results.length ? <Feed results={results}/> : <p className="statusMsg">No posts to display</p> )}

        </main>

    )

}

export default Home