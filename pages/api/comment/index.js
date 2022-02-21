import {comments} from '../../../data/comment'

export default function handler(req, res) {
    res.status(200).json(comments)
  }