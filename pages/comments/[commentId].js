import { comments } from '../../data/comment'

function Comment({comment}){
    return (
        <div>
            {comment.id}--- {comment.text}
        </div>
    )
}
export default Comment

// Return the object of the path properties
export async function getStaticPaths() {
    return {
        paths: [
            {
                params: {commentId: '1'}
            },
            {
                params: {commentId: '2'}
            },
            {
                params: {commentId: '3'}
            }
        ],
        fallback: false,
    }
}

// Return the object of the props
export async function getStaticProps(context){
    const {params} = context
    const {commentId} = params

    const comment = comments.find((comment) => comment.id === parseInt(commentId))

return {
    props: {
        comment,
    },
}
}