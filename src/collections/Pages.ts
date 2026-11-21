import { slugField } from 'payload'
import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'title' }),
    {
      label: 'content',
      name: 'Content',
      type: 'richText',
    },
  ],
}
