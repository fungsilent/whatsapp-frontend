'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

const PostPage = () => {
    const { postId } = useParams()
    const [post, setPost] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchPostDetail()
    }, [postId])

    async function fetchPostDetail() {
        try {
            const res = await fetch(`http://localhost:3001/post/${postId}`)
            const { ok, data, error } = await res.json()
            if (!ok) {
                return setError(error)
            }
            setPost(data)
        } catch (err) {
            return setError('Server Error')
        }
    }

    return (
        <div className='bg-slate-200 p-4'>
            <p>Post {postId}</p>
            {post && (
                <div>
                    <h1 className='font-bold text-3xl'>{post.title}</h1>
                    <p>{post.content}</p>
                </div>
            )}
            {error && <div>{error}</div>}
        </div>
    )
}

export default PostPage
