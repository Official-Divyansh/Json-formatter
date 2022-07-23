import React, { useEffect, useState } from 'react'
import Double from './images/double.png'



const Menu = ({ data }) => {
    return (
        <>
            {
                Object.entries(data).map(([item, i], ind) => (
                    <>

                        <h1 className='text-blacks font-semibold mb-1'>

                            {JSON.stringify(item)}:
                            {typeof i === 'number' ?
                                <span className='text-red-500 font-semibold'> {JSON.stringify(i)}  </span>
                                : typeof i === 'object' ?

                                    <span >&#123;
                                        <Menu data={i} />
                                        &#125;
                                    </span>
                                    :
                                    <span className='text-green-600 font-semibold'> {JSON.stringify(i)}  </span>
                            }
                        </h1>

                    </>
                ))
            }

        </>

    );
}
export default function Format({ datas, error, parentCollapse, setParentCollapse }) {




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

    return (
        <div className='ml-10 mt-4'>
            {datas ?
                <div>&#123;
                </div>
                :
                ' Your formatted JSON output'
            }
            {
                error && <p className='text-red-500 font-semibold'>Syntax error: please enter a valid json formate data</p>
            }
            {
                Object.entries(datas ? datas : '').map(([item, i], ind) => (
                    <>

                        <h1 className='text-blacks font-semibold mb-1'>
                            {
                                parentCollapse && parentCollapse[ind].watch == true &&
                                <p className='inline mr-6 bg-pink-300 pl-2 pr-2 cursor-pointer' onClick={() => remove(ind)}>-</p>
                            }
                            {JSON.stringify(item)}:


                            {typeof i === 'number' ?
                                <span className='text-red-500'> {JSON.stringify(i)} : </span>
                                : typeof i === 'object' ?
                                    parentCollapse && parentCollapse[ind].watch == true ?
                                        <span>[

                                            <Menu data={i} />
                                            ]
                                        </span>
                                        : <span>[
                                            <img src={Double} className='inline cursor-pointer' onClick={() => setToLocal(ind)} />
                                            ]
                                        </span>
                                    :
                                    <span className='text-green-600 font-semibold'> {JSON.stringify(i)} </span>

                            }
                        </h1>

                    </>
                ))
            }
            {datas &&
                <div>&#125;</div>
            }
        </div>
    )
}

