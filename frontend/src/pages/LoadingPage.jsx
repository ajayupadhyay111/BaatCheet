import { Loader2 } from "lucide-react"

const LoadingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg text-muted-foreground animate-pulse">
        Loading...
      </p>
    </div>
  )
}

export default LoadingPage