import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { author } from './author'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, author],
}
