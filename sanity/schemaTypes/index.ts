import { type SchemaTypeDefinition } from 'sanity'
import { project } from './project'
import { author } from './author'
import { playlist } from './playlist'


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [project, author, playlist],
}
