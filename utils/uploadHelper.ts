export const uploadFile = async(files: File[], type: string) => {
  const images = []

  for (const file of files) {
    const formData = new FormData()

    formData.append('file', file)
    type === 'avatar'
    ? formData.append('upload_preset', 'erszbrb2')
    : type === 'cv'
      ? formData.append('upload_preset', 'k6kmr9vg')
      : type === 'category'
        ? formData.append('upload_preset', 'gmlca55a')
        : formData.append('upload_preset', '')
    formData.append('cloud_name', 'dpef9sjqt')

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dpef9sjqt/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      images.push(data.secure_url)
    } catch (err: any) {
      console.log(err)
    }
  }

  return images
}