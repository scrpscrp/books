export function imageConverter(event: Event, callback: (imageUrl: string) => void): void {
  const inputElement = event.target as HTMLInputElement
  if (inputElement?.files?.length) {
    const file = inputElement.files[0]
    
    const reader = new FileReader()
    
    reader.onload = () => {
      const imageUrl = reader.result as string;
      callback(imageUrl)
    };
    
    reader.readAsDataURL(file)
  } 
}