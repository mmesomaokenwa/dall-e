import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { DevTool } from '@hookform/devtools'
import { useCreatePost, useGenerateImage } from '../hooks/mutations'
import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'

const CreatePost = () => {
  const navigate = useNavigate()

  const { mutateAsync: createPost } = useCreatePost()

  const { mutateAsync: generateImage, isLoading: generatingImg } = useGenerateImage()

  const { register, handleSubmit, control, getValues, setValue, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      name: '',
      prompt: '',
      photo: ''
    }
  })

  const photoRegister = register('photo', {required: true})
  
  const onSubmit = async (data) => {
    try {
      const post = await createPost(data)

      if (!post) {
        throw new Error('An error occurred while creating a post')
      }
      navigate('/')
    } catch (error) {
      alert(error.message || 'An error occurred while creating a post')
    }
  }

  const handleGenerate = async () => {
    if (!getValues('prompt')) {
      alert('Please enter a prompt')
      return
    }

    try {
      const data = await generateImage(getValues('prompt'))

      if (!data) {
        throw new Error('An error occurred while generating an image')
      }
      setValue('photo', `data:image/jpeg;base64,${data.photo}`, {shouldDirty: true, shouldValidate: true})
    } catch (error) {
      alert(error.message || 'An error occurred while generating an image')
    }
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(getValues('prompt'))
    setValue('prompt', randomPrompt, {shouldDirty: true})
  }
  return (
    <div className='max-w-7xl mx-auto'>
      <div>
        <h1 className='font-extrabold text-[#222328] text-[32px]'>Create</h1>
        <p className='mt-2 text-[#666e75] text-[14px] max-w-[500px]'>Create imaginative images through DALL-E AI and share them with the community</p>
      </div>
      <form className='mt-16 max-w-3xl' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col gap-5'>
          <FormField
            labelName="Your Name" type="text" placeholder="John Doe"
            register={register('name', {required: true})}/>
          <FormField
            labelName="Prompt" type="text" placeholder="A plush toy robot sitting against a yellow wall"
            register={register('prompt', {required: true})}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className='relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center'>
            {getValues('photo') ? (
              <img
                src={getValues('photo')}
                alt={getValues('prompt')}
                className='w-full h-full object-contain'
              />
            ) : (
              <img
                src={preview}
                alt='preview'
                className='w-9/12 h-9/12 object-contain opacity-40'
              />
            )}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg'>
                <Loader />
              </div>
            )}
          </div>
        </div>
        <div className='mt-5 flex gap-5'>
          <button
            type='button'
            onClick={handleGenerate}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>
        <div className='mt-10'>
          <p className='text-[#666e75] text-[14px]'>Once you have created the image you want, you can share it with others in the community</p>
          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {isSubmitting ? 'Sharing...' : 'Share with the community'}
          </button>
        </div>
        <DevTool control={control} />
      </form>
    </div>
  )
}

export default CreatePost