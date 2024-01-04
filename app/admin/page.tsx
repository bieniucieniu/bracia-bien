import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Admin() {
  return (
    <main className="px-10 pt-20 pb-20 flex flex-col justify-center items-center gap-4 relative ">
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Uploader</CardTitle>
        </CardHeader>
        <CardContent></CardContent>
      </Card>
    </main>
  )
}
