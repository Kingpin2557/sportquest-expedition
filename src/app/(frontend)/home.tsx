import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const result = await payload.find({
    collection: 'pages',
    where: {
      slug: { equals: 'home' },
    },
    limit: 1,
  })

  const page = result.docs[0]

  if (!page) {
    notFound()
  }

  return (
    <main>
      <h1>{page.title}</h1>
    </main>
  )
}
