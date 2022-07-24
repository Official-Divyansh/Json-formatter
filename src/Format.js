import React, { useEffect, useRef, useState } from 'react'
import Double from './images/double.png'
import down from './images/down2.png'
import up from './images/up2.png'


const Menu = ({ data }) => {
    return (
        <>
            {
                Object.entries(data).map(([item, i], ind) => (
                    <>

                        <h1 className='text-blacks font-semibold mb-1'>

                            {JSON.stringify(item)}:
                            {typeof i === 'number' ?
                                <span className='text-red-500 font-semibold'> {i}  </span>
                                : typeof i === 'object' ?

                                    <span >&#123;
                                        <Menu data={i} />
                                        &#125;
                                    </span>
                                    :
                                    <span className='text-green-600 font-semibold'> {`"${i}"`}  </span>
                            }
                        </h1>

                    </>
                ))
            }

        </>

    );
}
export default function Format({ datas, error, parentCollapse, setParentCollapse ,lines}) {
         const countLine = useRef(null)
    const setToLocal = (value) => {
        const data = parentCollapse.map((feed) => ({
            ...feed,
            watch: feed.key == value ? true : feed.watch
        }))
        setParentCollapse(data)
       
    }
    const remove = (value) => {
        const data = parentCollapse.map((feed) => ({
            ...feed,
            watch: feed.key == value ? false : feed.watch
        }))
        setParentCollapse(data)

    }

    useEffect(()=>{
    },[])
    return (
       
        <div className='ml-10 mt-4'  ref={countLine}>
            {datas ?
                <div>&#123;
                </div>
                :
                ' Your formated JSON output'
            }
            {
                error && <p className='text-red-500 font-semibold'>Syntax error: please enter a valid json formate data</p>
            }
            {
                Object.entries(datas ? datas : '').map(([item, i], ind) => (
                    <>

                        <div className='text-blacks font-semibold mb-1'>
                            <p className='inline relative -left-10  bg-pink-200 pl-2 pr-2 '>
                                {ind+1}
                                </p>
                            {
                                parentCollapse && parentCollapse[ind].watch == true && typeof i === 'object' ?
                                    <img  src={up} className='inline cursor-pointer -translate-x-4' onClick={()=> remove(ind)} />
                                    : typeof i === 'object' &&
                                    <img  src={down} className='inline cursor-pointer -translate-x-4 w-[10%] sm:w-[5%] ' onClick={()=> setToLocal(ind)} />     
                            }
                            { `"${item}"`}:


                            {typeof i === 'number' ?
                                <span className='text-red-500'> {i} : </span>
                                : typeof i === 'object' ?
                                parentCollapse && parentCollapse[ind].watch == true ?
                                <span >[

                                            <Menu data={i} />
                                            ]
                                        </span>
                                        : <span>[
                                            <img src={Double} className='inline cursor-pointer' onClick={() => setToLocal(ind)} />
                                            ]
                                        </span>
                                    :
                                    <span className='text-green-600 font-semibold'> {`"${i}"`} </span>
                                    
                                }
                        </div>

                    </>
                ))
            }
            {datas &&
                <div>&#125;</div>
            }
        </div>
    )
}

