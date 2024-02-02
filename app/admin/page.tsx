import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Uploader from "@/components/Admin/Uploader"
import Deleter from "@/components/Admin/Deleter"

export default async function Admin() {
  return (
    <main className="px-10 pt-20 pb-20 flex flex-col justify-center items-center gap-4">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Uploader</CardTitle>
        </CardHeader>
        <CardContent>
          <Uploader />
        </CardContent>
      </Card>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Deleter</CardTitle>
        </CardHeader>
        <CardContent>
          <Deleter />
        </CardContent>
      </Card>
    </main>
  )
}
