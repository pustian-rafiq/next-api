import React,{useState} from 'react'

function CommentPage() {
    const [comments, setComments] = useState([])
    const fetchComments = async () => {
        const response = await fetch('/api/comment')
        const data = await response.json()
        setComments(data)
    }
  return (
    <>
        <button onClick={fetchComments}>Show Comment</button>

        {
            comments.map((comment) => {
                return (
                    <div key={comment.id}>
                        {comment.id} --- {comment.text}
                    </div>
                )
            })
        }
    </>
  )
}

export default CommentPage