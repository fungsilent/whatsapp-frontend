'use client'
import { useEffect } from 'react'
import Link from 'next/link'
import useFetch from '#root/hooks/useFetch'
import axiosBackend from '#root/utils/axios'

const PostsPage = () => {
    const [dispatchFetch, postList, isLoading, error] = useFetch()

    useEffect(() => {
        dispatchFetch(async handleResponse => {
            try {
                const res = await axiosBackend.get('/post')
                handleResponse(res)
            } catch (err) {
                handleResponse({ error: err.message })
            }
        })
    }, [])

    return (
        <div className='py-4'>
            {postList &&
                postList.map(({ _id, title, content }) => {
                    return (
                        <div
                            key={_id}
                            className='mb-8'
                        >
                            <h1 className='font-bold text-3xl'>{title}</h1>
                            <p className='my-2'>{content}</p>
                            <Link
                                href={`/post/${_id}`}
                                className='bg-orange-300 py-2 px-4'
                            >
                                Read More
                            </Link>
                        </div>
                    )
                })}
        </div>
    )
}

export default PostsPage
