import { useParams } from 'react-router-dom'

function FullBlog() {
  const { id } = useParams();

  return (
    <h1>FullBlog #{id}</h1>
  )
}

export default FullBlog