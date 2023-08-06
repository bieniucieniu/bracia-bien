"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"

export default function ErrorAlert({
  error,
  onAccept,
}: {
  error?: Error
  onAccept?: () => void
}) {
  return error ? (
    <AlertDialog defaultOpen={true}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Show Error</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>error</AlertDialogTitle>
          <AlertDialogDescription>
            <p>name: {error.name}</p>
            <p>message: {error.message}</p>
            {error.cause ? <p>cause: {JSON.stringify(error.cause)}</p> : null}
            {error.stack ? <p>stack: {error.stack}</p> : null}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onAccept}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : null
}
