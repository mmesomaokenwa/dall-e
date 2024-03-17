import { useMutation, useQueryClient } from 'react-query'
import { createPost, generateImage } from '../utils/api'

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['createPost'],
    mutationFn: (post) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}

export const useGenerateImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ['generateImage'],
    mutationFn: (prompt) => generateImage(prompt),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
    }
  })
}