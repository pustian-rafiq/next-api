import React,{useState} from 'react'

function CommentPage() {
    const [comments, setComments] = useState([])
    const [comment, setComment] = useState("")
    const fetchComments = async () => {
        const response = await fetch('/api/comment')
        const data = await response.json()
        setComments(data)
    }
const submitComment = async () => {
    const response = await fetch('/api/comment',{
        method: 'POST',
        body: JSON.stringify({comment}),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    console.log(data)
}

  return (
    <>
    <div style={{width: '45%',backgroundColor:'gray', height: '30px', marginTop: '20px', marginLeft: '50px'}}>
    <input onChange={(e)=> setComment(e.target.value)} style={{width: '84%' , height: '30px'}} type="text" />
    <button style={{ marginLeft:'5px'}} onClick={submitComment}>Add Comment</button>
    </div>
    <div style={{width: '50%', height: '30px', marginTop: '20px', marginLeft: '50px'}}>
    <button onClick={fetchComments}>Show Comment</button>
    </div>
      

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