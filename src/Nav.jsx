const Nav = ({ search, setSearch }) =>{

    return(

        <nav>

           <form onSubmit={e => e.preventDefault()} className="searchForm">

                <label htmlFor="search">Search Posts</label>

                <input 
                    type="text"
                    placeholder="Search Posts"
                    id="search" 
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />

           </form>

        </nav>

    )

}

export default Nav