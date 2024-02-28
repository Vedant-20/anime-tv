import React from 'react'
import { Link } from 'react-router-dom'


function Header(props) {
  return (
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
  )
}

export default Header