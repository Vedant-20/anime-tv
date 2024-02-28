import React from 'react'
import { Link } from 'react-router-dom'

function Home({animeList}) {


  return (
    <>
    <header className='flex justify-center items-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
    <Link to={'/'}>
    <button className='mt-8 mb-8 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-600/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600' >Go To Home</button>
    </Link>
    
    </header>
    <div className='flex flex-wrap gap-3 mb-12'>
        <div className='w-full items-center justify-center text-center'>
            <h1 className='text-lime-400 text-2xl font-bold'>Your Search Results Will Appear Here 👇</h1>
        </div>
        
        {animeList.map((anime)=>(
            <div key={anime?.mal_id} className='w-[400px] mb-25 cursor-pointer flex-shrink-0 md:w-[calc(25%-15px)] lg:w-[calc(20%-16px)]'>
            <Link to={`/anime/${anime.mal_id}`} key={anime?.mal_id} >
                <div className='relative w-full aspect-w-1 aspect-h-1.5 bg-cover bg-center mb-30 flex items-end justify-between p-10 transition ease-in duration-500'>
                    <img className='w-full h-full object-cover object-center rounded-2xl' src={anime?.images?.jpg.image_url} alt={anime?.title} />
                </div>
                </Link>
                <div className='flex flex-col text-white text-center'>
                    <span className='text-sm mb-3 leading-6 text-wrap'>{anime?.title}</span>
                </div>

            </div>
            
        ))}
        
    </div>
    </>
  )
}

export default Home