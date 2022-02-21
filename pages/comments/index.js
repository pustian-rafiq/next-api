import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

function CommentPage() {
    const [comments, setComments] = useState([])
    const [commentDetails, setCommentDetails] = useState("")
    const [comment, setComment] = useState("")


    const router = useRouter()
    // const id = router.query
    const fetchComments = async () => {
        const response = await fetch('/api/comment')
        const data = await response.json()
        setComments(data)
    }
    const fetchCommentDetails = async (id) => {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'GET',
        })
        const data = await response.json()
        setCommentDetails(data)
    }

    const deleteComment = async (id) => {
        const response = await fetch(`/api/comment/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        console.log("Delete Comment", data);
        fetchComments()
    }
    const submitComment = async () => {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ comment }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        console.log(data)
    }

    return (
        <>
            <div style={{ width: '45%', backgroundColor: 'gray', height: '30px', marginTop: '20px', marginLeft: '50px' }}>
                <input onChange={(e) => setComment(e.target.value)} style={{ width: '84%', height: '30px' }} type="text" />
                <button style={{ marginLeft: '5px' }} onClick={submitComment}>Add Comment</button>
            </div>
            <div style={{ width: '50%', height: '30px', marginTop: '20px', marginLeft: '50px' }}>
                <button onClick={fetchComments}>Show Comment</button>
                {/* <button onClick={fetchCommentDetails}>Show Comment Details</button> */}
                <button onClick={fetchComments}>Delete Comment</button>
            </div>
            {

                comments.map((comment) => {
                    return (
                        <div key={comment.id} style={{ marginTop: '5px', backgroundColor: 'green' }}>
                            {comment.id} --- {comment.text} -- 
                             <button >
                                <Link href={`/api/comment/${comment.id}`} >
                                    <a>Details</a>
                                </Link >
                                </button>
                            <button onClick={() => deleteComment(comment.id)}>Delete</button>
                        </div>

                    )
                })
            }
            {
                commentDetails ?

                    <div key={commentDetails.id} style={{ marginTop: '5px', backgroundColor: 'green' }}>
                        {commentDetails.id} --- {commentDetails.text} --
                        <button onClick={() => deleteComment(commentDetails.id)}>Delete</button>
                    </div>
                    : ''

            }




        </>
    )
}

export default CommentPage