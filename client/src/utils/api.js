export const createPost = async (post) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
    if (!response.ok) throw new Error('An error occurred while creating a post')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message || 'An error occurred while creating a post')
  }
}

export const getPosts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/post')
    if (!response.ok) throw new Error('An error occurred while fetching posts')
    const data = await response.json()
    return data.data.reverse()
  } catch (error) {
    console.log(error.message || 'An error occurred while fetching posts')
  }
}

export const generateImage = async (prompt) => {
  try {
    const response = await fetch('http://localhost:8080/api/v1/dalle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt
      })
    })
    if (!response.ok) throw new Error('An error occurred while generating an image')
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error.message || 'An error occurred while generating an image')
  }
}