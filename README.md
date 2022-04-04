https://github.com/AM-code-treasure/coding-challenge-frontend-react

# React Demo Dashboard

## Running the project locally

### Development

```bash
$ pnpm install # alternatively use npm
$ pnpm run dev
# now listening on http://localhost:2020/
```

### Production

```bash
$ pnpm run start
# production build now listening on http://localhost:8080/
```

```bash
$ pnpm run export
# production build is now rendered and stored in ./dist
```

## Technical decisions

- **React Framework**\
  I'm using my own framwork called `snowstorm`. It's pretty much a more minimal alternative to `next.js` so it enabled me to get up and running really quickly and even for a single page makes it a bit more snappy by prerendering the html.
- **Testing**\
  I've opted to use `vitest` instead of `jest` to minimize complexity (My react framework uses vite as a bundler and so does vitest). Other than that the bundler it's mostly the same api as `jest`.
- **CSS-Modules**\
  While I do have extensive experience with CSS-in-JS frameworks such as `styled-components`, I don't see a huge benefit because of their added complexity (e.g when using SSR), especially now with css-modules and native css variables.
- **Linting**\
  I use my own `eslint` config for all of my projects. This includes various plugins for `react` and `typescript` code and an integration with `prettier` for code formatting.
- **Deployment**\
  Code is delpoyed using cloudflare pages just due to it being the simplest and fasted way to get something up and running from my experience.

## Notes

I've decided to stick to a single sans-serif and serif font each, Montserrat and Roboto serve the same purpose and just make the page look inconsistent and degrade performance. Other than that, the figma file was unpolished/inconsistent, which is a bit weird with the pixel-prefect requirement, so I've changed some values around (I used css variables and e.g use the same padding on both the left and right side to make things consistent). Because of this and to save time I've not made a huge effort to make the site responsive. For tests theres a basic setup but likewise not going into too much depth here because it's a pretty simple site without a lot of complexity.
