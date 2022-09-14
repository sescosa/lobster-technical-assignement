import { test } from '@japa/runner'

test.group('The Job Description page works', () => {
  test(`Given a GET request to "/job-description'"
  Then we get a 200 status back
  With a http response including a title with "What we do"`, async ({ client }) => {
    const response = await client.get('/job-description')

    response.assertStatus(200)
    response.assertTextIncludes('<h1>What we do</h1>')
  })
})

test.group('The home page works', () => {
  test(`Given a GET request to "/'"
  Then we get a 200 status back
  With a http response including a title with "It Works!"`, async ({ client }) => {
    const response = await client.get('/')

    response.assertStatus(200)
    response.assertTextIncludes('<h1 class="text-4xl font-serif"> It Works! </h1>')
  })
})
