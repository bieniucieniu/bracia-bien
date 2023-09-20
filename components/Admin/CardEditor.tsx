import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "@/components/ui/textarea"
import { insertCardSchema } from "@/db/infoCard/serverApi"
import { infoCardCategorieEnum } from "@/db/schema/infoCard"
import { useEffect } from "react"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { toPl } from "@/lib/utils"
import ImageSelector from "./ImageSelector"
import { twMerge } from "tailwind-merge"
import { Label } from "../ui/label"

export const formSchema = insertCardSchema.omit({ id: true })

export default function CardEditor({
  onSubmit,
  data,
  className,
}: {
  data?: z.infer<typeof formSchema>
  onSubmit: (values: NonNullable<z.infer<typeof formSchema>>) => void
  className?: string
}) {
  const form = useForm<NonNullable<z.infer<typeof formSchema>>>({
    // @ts-ignore
    resolver: zodResolver(insertCardSchema),
    defaultValues: data,
  })

  const { isSubmitSuccessful } = form.formState

  useEffect(() => {
    if (isSubmitSuccessful) form.reset()
  }, [isSubmitSuccessful, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={twMerge("space-y-8", className)}
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Tytuł</FormLabel>
              <FormControl>
                <Input
                  placeholder="title"
                  {...field}
                  type="text"
                  value={value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Przypis</FormLabel>
              <FormControl>
                <Input
                  placeholder="description"
                  {...field}
                  type="text"
                  value={value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>Kontent</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="content"
                  {...field}
                  value={value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field: { value, ...field } }) => (
            <FormItem>
              <FormLabel>link</FormLabel>
              <FormControl>
                <Input
                  placeholder="https://braciabien.pl"
                  {...field}
                  type="text"
                  value={value ?? ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageKey"
          render={({ field: { onChange, value, ...field } }) => (
            <FormItem className="space-y-3">
              <FormLabel>Zdjecie</FormLabel>
              <span className="flex flex-row items-center gap-x-4">
                <FormControl>
                  <ImageSelector
                    onImageSelect={(key) => {
                      onChange(key)
                    }}
                    keyValue={value ?? ""}
                    {...field}
                  />
                </FormControl>
                <p>{value ?? "not selected"}</p>
                <FormMessage />
              </span>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categorie"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Kategoria</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value ?? "current"}
                  className="flex flex-row space-x-1"
                >
                  {infoCardCategorieEnum.enumValues.map((str) => {
                    return (
                      <FormItem
                        key={str}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={str} />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {toPl(str)}
                        </FormLabel>
                      </FormItem>
                    )
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
