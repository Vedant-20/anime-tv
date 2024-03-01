import React from 'react'
import { Link } from 'react-router-dom'


function Header(props) {
  return (
    <>
    <header className='flex justify-between items-center'>
    <Link to={'/'}>
    <h1 className='text-2xl font-bold pink-text-gradient'>The <strong className='text-2xl green-text-gradient font-bold underline'>Anime</strong> Tv</h1>
    </Link>
        

        <div className='flex justify-center items-center'>
            <form className='flex justify-self-end flex-1' onSubmit={props.HandleSearch}>
                <input className='appearance-none bg-none outline-none border-none block w-full max-w-[400px] p-4 rounded-3xl bg-slate-100/45 placeholder:text-white  focus:bg-yellow-300 valid:bg-yellow-300 focus:text-black valid:text-black' type="search" placeholder='Search for an Anime.....' required value={props.search} onChange={(e)=>props.setSearch(e.target.value)} />
                <button className='rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' type='submit' onClick={(e)=>props.setSearch(e.target.value)} value={props.search}>Search</button>
            </form>
        </div>
    </header>

    <div className="flex flex-col lg:flex lg:flex-row w-full">
      <div className="flex justify-center items-center">
        <h2 className="text-yellow-300 font-bold text-3xl">Top Animes 👉</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 p-8 rounded-xl">
      {props.topAnime.map((anime) => (
        
          <div
            key={anime?.mal_id}
            className=" mb-25 flex-col mybg  "
          >
          <Link to={`/anime/${anime.mal_id}`} key={anime?.mal_id} >
            <div className="p-2   rounded-2xl transition delay-150 duration-300 ease-in-out">
              <img
                className="w-full h-full object-cover object-center rounded-xl"
                src={anime?.images?.jpg.image_url}
                alt={anime?.title}
              />
            </div>
            </Link>
            <div className="flex flex-col text-white text-center">
              <span className="text-sm mb-1 leading-6 text-wrap">
                {anime?.title}
              </span>
              <h3><span className="text-xl text-violet-500 font-bold">Score :</span> {anime?.score}🌟</h3>
            </div>
          </div>
        
      ))}
      </div>
    </div>
    </>
  )
}

export default Header