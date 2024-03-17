import { useQuery } from "react-query";
import { getPosts } from "../utils/api";

export const useGetPosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: () => getPosts(),
  })
}