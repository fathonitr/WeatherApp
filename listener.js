import {defaultFetch, perInputFetch} from './fetcher.js'

export default function runner(){
    window.addEventListener('load',()=>{
        defaultFetch()
      })
}

const input = document.querySelector(".search-bar");
input.addEventListener('keypress', (e)=>{
    perInputFetch(e, input)
})