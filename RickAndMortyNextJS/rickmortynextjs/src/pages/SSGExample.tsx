import { GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'


export interface EpisodeData{
    info: Info
    results: Result[]
  }
  
  export interface Info {
    count: number
    pages: number
    next: string
    prev: any
  }
  
  export interface Result {
    id: number
    name: string
    type: string
    dimension: string
    residents: string[]
    url: string
    created: string
  }
  
interface SSGComponentProps{
    episodeData:EpisodeData
}



export const getStaticProps:GetStaticProps<SSGComponentProps>=async()=>{
   
    const episodenumber = Math.round(Math.random()*10)
    const urlEpisode=`https://rickandmortyapi.com/api/episode/${episodenumber}`

    const response = await fetch(urlEpisode)
    const results = await response.json()

    console.log(results)

    return {
        props:{
            episodeData: results
        },
        revalidate: 3*60,
    }

}

function SSGExample({episodeData}:SSGComponentProps) {
    console.log(episodeData)
    console.log( process.env.SERVER)
    console.log( process.env.NEXT_PUBLIC_VARIABLE)

    const episodes =episodeData["results"]
    return (
        <>
            <Head>
                <title>This is the start of the project</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div>SSGExample</div>
            {episodes&&episodes.map((episode)=>{return(<div key={episode.name}>{episode.name}</div>)})}
            </>
            

    )
}

export default SSGExample