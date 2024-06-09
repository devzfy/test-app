import { useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
const Home = () => {
  const {toast} = useToast()
  useEffect(()=>{
    toast({
      title: 'Muvaffaqiyat!',
      description: 'UzChess platformasiga hush kelibsiz',
    })
  },[toast])
  return <div className="flex justify-items-stretch">
    Bosh sahifa
    <Toaster/>
  </div>
}

export default Home
