import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  })

  console.log('Requested slug:', slug)
  console.log('Matching pages:', result.docs.length)

  const page = result.docs[0]

  if (!page) notFound()

  return <h1>{page.title}</h1>
}
