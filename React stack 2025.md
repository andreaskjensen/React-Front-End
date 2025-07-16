# React stack 2025

Helt generelt vil jeg lige starte med at sige at det er bedre at blive rigtig god til at bruge nogle få værktøjer, end at drukne i en masse deps som I aldrig får implementeret tilstrækkeligt til at få glæde af.

Når det er sagt, så er React *ikke* et batteries-included framework som nogle af de andre spillere. Det er både godt og skidt. Godt fordi det har fordret et meget diverst idelandskab som man selv kan plukke det bedste fra. Og skidt fordi det kan være svært at navigere. Det sidste håber jeg at det her dokument kan være en hjælp med.

## Must haves

### TypeScript

Den siger vist sig selv 🤷‍♂️

### TanStack Router

   - Hvis I ønsker server-side rendering → [Tanstack Start](https://tanstack.com/start/latest)
   - Hvis I kun har brug for client-side rendering → [create-tsrouter-app](https://github.com/TanStack/create-tsrouter-app)

> Når jeg linker til to generatorer i stedet for [TanStack Router dokumentionen](https://tanstack.com/router/latest/docs/framework/react/overview) er det fordi det er routeren som I skal starte med, uanset hvad. Det er *klart* nemmest med en generator.

Der er ingen vej uden om det, I får brug for en router. Og imo er der intet som overhovedet kommer tæt på TanStack Router. Hverken hvad angår ergonomi, features eller TS support.

React Router er lige på nippen til at gøre bedre brug af TS, men det er *intet* i forhold til hvad Tanner har opnået med TanStack Router. Her er typerne indtænkt fra starten, og det mest fantastiske er at man I praksis ikke annoterer typerne selv—alt er infereret. Man kan have typestærke query-parametre & navigation, loaders, middleware, fil-baseret rute-generation med Vite plugin (eller cli), skemavalidering og meget meget mere.

### Vite

I 2025 kan jeg ikke se nogen som helst grund til at vælge et andet byggeværktøj end Vite, med mindre ens framework-valg ikke er kompatibelt (jeg kigger på dig Next 😠).

Det har enestående ergonomi, er nemt at opsætte og vedligeholde og er har betydelige performance-forbedringer i forhold til traditionelle bundlere. Kort sagt kan I fokusere på at skrive kode frem for at håndtere komplekse build-processer. Derudover giver Vite's plugin-arkitektur mulighed for nemt at tilføje yderligere funktionalitet og tilpasse udviklingsmiljøet.

Og måske vigtigst er at Vite har vind i sejlene—alle andre også bruger Vite, så der er fantastisk support til alt I får brug for.

### Linting & formatering

Hvis man vil koordinere blandt udviklere, er det ikke nok med møder og aftaler. I skal bruge et værktøj som kan automatisere strømligningen af jeres projekt.

Man skal ikke gå og bruge tid på at diskutere om det er tabs eller spaces, eller hvordan imports skal sorteres etc. Det løser en *formatter*, især hvis I opsætter format-on-save + checker for afvigelser som en del af jeres CI setup før man kan merge til master.

En *linter* hjælper med at finde og rette fejl i koden automatisk, sikre ensartet stil og gøre koden nemmere at læse og vedligeholde. Det kan også mindske risikoen for git merge conflicts, da ensartet formattering reducerer unødvendige ændringer i koden. Og så kan man i øvrigt lære en masse af at læse of forstå fejlbeskederne som en linter giver.

Det mest udbredte setup er ESLint + Prettier. Der sker en masse interessant udvikling på det her område lige for tiden, for eksempel med Biome. Men hvis jeg var jer, ville jeg bare gå med ESLint (med flad config) og Prettier. Så har I det største udvalg af regler at vælge mellem.

> 💡 Hold jer tæt til standard-regelsæt til at starte med, og udvikl jeres egen stil (i samråd!) hen af vejen som I finder specifikke behov.

Her er et par must-have plugins:

- [`eslint-plugin-react`](https://github.com/jsx-eslint/eslint-plugin-react)
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) (bliver en del af `eslint-plugin-react` på sigt)
- `typescript-eslint` er et plugin med regler som også kigger på type-niveau.

Og nogle af mine favorit specifikke regler:

- `@typescript-eslint/no-explicit-any`
- `@typescript-eslint/no-unnecessary-condition`
- `react/jsx-sort-props`
- `no-duplicate-imports`
- `no-unreachable`
- `react-hooks/exhaustive-deps` ❗️
- `react/no-unstable-nested-components`
```other
"no-restricted-syntax": [
    "warn",
        {
          selector: "TSEnumDeclaration",
          message: "Please use string literal union or objects instead of enums.",
        },
      ],
```

> 💡 Næsten all regler skal være sat til `error`. Hvis ikke, har de det med at blive ignoreret.

## PNPM

## Continuous integration

## Dokumentation i README

## Overvej også dem her

Vitest

CI

Vite

React query

Tailwind

cva

React Compiler

[Search Params Are State | TanStack Blog](https://tanstack.com/blog/search-params-are-state)

