# React stack 2025

Helt generelt vil jeg lige starte med at sige at det er bedre at blive rigtig god til at bruge nogle få værktøjer, end at drukne i en masse dfeps som aldrig bliver implementeret tilstrækkeligt.

Når det er sagt, så er React *ikke* et batteries-included framework som nogle af de andre spillere. Det er både godt og skidt. Godt fordi det har fordret et meget diverst idelandskab som man selv kan plukke det bedste fra. Og skidt fordi det kan være svært at navigere. Det sidste håber jeg at det her dokument kan være en hjælp med.

## TypeScript

Kort og godt, JavaScript med typer, og kan derfor hjælpe med at reducere type fejl.

Bliver kompileret til almindelig JavaScript ved compile time.

## TanStack Router

   - Hvis I ønsker server-side rendering → [Tanstack Start](https://tanstack.com/start/latest)
   - Hvis I kun har brug for client-side rendering → [create-tsrouter-app](https://github.com/TanStack/create-tsrouter-app)

> Når jeg linker til to generatorer i stedet for [TanStack Router dokumentionen](https://tanstack.com/router/latest/docs/framework/react/overview) er det fordi det er routeren som I skal starte med, uanset hvad. Det er *klart* nemmest med en generator.

React Router (konkurrent og mest brugte router pt.) er lige på nippen til at gøre bedre brug af TS, men det er *intet* i forhold til hvad Tanner har opnået med TanStack Router. Her er typerne indtænkt fra starten, og det mest fantastiske er at man I praksis ikke annoterer typerne selv—alt er infereret. Man kan have typestærke query-parametre & navigation, loaders, middleware, fil-baseret rute-generation med Vite plugin (eller cli), skemavalidering og meget meget mere.

> 💡 Når man først har ergonomisk og typestærk url-parameter håndtering, er der virkelig næsten ingen grund til ikke at holde sit state i url'en i stedet for at bruge useState. ☝️

[Search Params Are State | TanStack Blog](https://tanstack.com/blog/search-params-are-state)

## Vite

I 2025 kan jeg ikke se nogen som helst grund til at vælge et andet byggeværktøj end Vite, med mindre ens framework-valg ikke er kompatibelt.

Det har enestående ergonomi, er nemt at opsætte og vedligeholde og er har betydelige performance-forbedringer i forhold til traditionelle bundlere. Kort sagt kan I fokusere på at skrive kode frem for at håndtere komplekse build-processer. Derudover giver Vite's plugin-arkitektur mulighed for nemt at tilføje yderligere funktionalitet og tilpasse udviklingsmiljøet.

Og måske vigtigst er at Vite har vind i sejlene—alle andre også bruger Vite, så der er fantastisk support til alt I får brug for.

## Linting & formatering

Hvis man vil koordinere blandt udviklere, er det ikke nok med møder og aftaler. Her vil det klart være smartest med et værktøj som kan automatisere strømligningen af jeres projekt.

Man skal ikke gå og bruge tid på at diskutere om det er tabs eller spaces, eller hvordan imports skal sorteres etc. Det løser en *formatter*, især hvis I opsætter format-on-save + checker for afvigelser som en del af jeres CI setup før man kan merge til master.

En *linter* hjælper med at finde og rette fejl i koden automatisk, sikre ensartet stil og gøre koden nemmere at læse og vedligeholde. Det kan også mindske risikoen for git merge conflicts, da ensartet formattering reducerer unødvendige ændringer i koden. Og så kan man i øvrigt lære en masse af at læse of forstå fejlbeskederne som en linter giver.

Det mest udbredte setup er ESLint + Prettier. Der sker en masse interessant udvikling på det her område lige for tiden, for eksempel med Biome. Men jeg ville nok bare gå med ESLint (med flat config) og Prettier.

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
    "error",
        {
          selector: "TSEnumDeclaration",
          message: "Please use string literal union or objects instead of enums.",
        },
      ],
```

> 💡 Næsten all regler skal være sat til `error`. Hvis ikke, har de det med at blive ignoreret.

## Test

[Vitest](https://vitest.dev/) er test-runneren der endelig gør det nemt at skrive tests i Vite-baserede projekter. Den starter lynhurtigt, understøtter watch-mode, mocking og TS out-of-the-box – og bruger stort set samme API som Jest, så det er nemt at onboarde.

## Continuous Integration (CI)

At køre test, lint og typecheck automatisk før merge er en no-brainer. Det sikrer stabilitet og fjerner tvivl om hvorvidt noget er “klart”. Brug for eksempel [GitHub Actions](https://docs.github.com/en/actions) til at sætte en simpel pipeline op som kører:

- test
- lint
- typechecker
- formatering (og dernest checker at diffs ikke afviger fra branch, hvilket dermed sikrer at alt er formateret korrekt før merge)

Man kan vist også bruge [GitHub Actions i Azure](https://learn.microsoft.com/en-us/azure/developer/github/github-actions), men jeg tænker I har styr på havd der giver mening for os.

I kan altid tilføje mere hen af vejen som I får brug for det.

### TanStack Query

[TanStack Query](https://tanstack.com/query/latest) er løsningen på det evige problem: hvordan holder man klient-data i sync med serveren?

Det ændrer måden man tænker async state på:

- Du **beskriver** hvad du gerne vil hente.
- React Query **holder det i live**, cacher det og opdaterer det for dig.
- Når du ændrer noget (POST/PUT/DELETE), så **invaliderer du** bare det relevante query → og så bliver det hentet igen.

Det fjerner behovet for at holde manuelle loading og data states i 20 forskellige komponenter. Spiller i øvrigt rigtig godt sammen med loaders i TanStack Router 🤝

## Tailwind

[Tailwind](https://tailwindcss.com/) giver dig lav-niveau styling utilities direkte i markup’en. Det betyder:

- Du slipper for .css-filer og class name collisions.
- Du skriver mindre CSS.
- css post-processering er indbygget
- Modsat komponent-baseret css som Bootstrap, har man helt frie tøjler med tailwind
- Det gør det meget nemmere at samarbejde med andre udviklere

> 💡 Sammen med [Prettier-plugin for Tailwind](https://github.com/tailwindlabs/prettier-plugin-tailwindcss) får du også automatisk sortering af klasser.

## Class Variance Authority (CVA)

[CVA](https://cva.style/) er et lille værktøj til at lave fleksible, typestærke varianter af Tailwind-klasser uden at miste læsbarheden.

Det gør det nemt at bygge design tokens og UI primitives uden at ende med 10 classNames + 40 if-statements. Eksempel:

```other
const button = cva('font-semibold px-4 py-2 rounded', {
  variants: {
    intent: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-100 text-black',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'sm',
  },
});
```

Det resulterer i nedenstående knapper:

![Screenshot 2025-07-20 at 16.18.03.png](https://res.craft.do/user/full/f0eaf141-4338-917f-9d2d-ae223059cf32/doc/ADA6DF06-8F11-4525-BB37-7121F728CCD0/a0307101-8b0b-4aa5-9894-92ba6e4ce0b7)

## PNPM

[PNPM](https://pnpm.io/) er et drop-in replacement for npm som er lynhurtig, pladsbesparende og mere deterministisk end både npm og yarn.

Den bruger et **content-addressable filesystem** som gør at pakker kun installeres én gang globalt, og linkes med symlinks.

## Dokumentation i README

Overvej at bruge README.md og docs/*.md til al dokumentation. Det er nemt at læse, versionsstyres med Git og kan previewes direkte på GitHub.

Brug evt. [shadcn/ui’s dokumentationsstruktur](https://ui.shadcn.com/docs/installation) som inspiration.

## Shadcn/ui

[shadcn/ui](https://ui.shadcn.com/) er en samling af basiskomponenter bygget med Radix UI, Tailwind og CVA.

Fordele:

- Du slipper for at opfinde knapper, dialoger og tooltips for 10. gang.
- Du ejer koden selv og kan tilpasse alt.
- Komponenterne er tilpasset moderne accessibility og keyboard-navigation out-of-the-box.

> Det er *meget* tidskrævende at lave sine egne grundkomponenter ordentligt. shadcn giver et færdigt fundament vi kan bygge videre på.

> 💡Hvis der er krav om god accessibility, er det nærmest umuligt at opnå noget der er acceptabelt på komponent-fronten.

## React Compiler

[React Compiler](https://react.dev/reference/react/compiler) en gamechanger for React hvad angår reactivity managment.

Den analyserer dine komponenter og **fjerner unødvendige renders** automatisk. Du slipper for at tænke på useMemo, useCallback og React.memo i de fleste tilfælde, samtidigt  med at siden bliver hurtigere. Win-win.

## TanStack Form

Ligesom de andre libs i TanStack-familien, er [Form](https://tanstack.com/form/latest) moderne og typesikker. Super ergonomisk måde at håndtere formularer uden magi eller boilerplate. Høj performance og stærk TS-integration gør det til et bedre valg end fx [React Hook Form](https://react-hook-form.com) imo.

## Opsætning af mit projekt

Jeg har sat et lille demo projekt op, men det er ikke fordi jeg har nået at lave noget særlig unikt og banebrydende. Man vil hurtigt kunne sætte et nyt projekt op via CLI:

n`px create-tsrouter-app@latest`

eller

p`npx create-tsrouter-app@latest`

Hovedsagligt skal man bare køre ovenstående, og så tager guiden en igennem opsætningen af projektet.

Hvis man ikke har pnpx, er opsætningen her:

[Installation | pnpm](https://pnpm.io/installation)

I opsætningen af mit projekt valgte jeg følgende:

- Router type: File Router
- Tailwind CSS: Yes
- Toolchain: ESLint
- Add-ons: Shadcn, Form og [TanstackTable](https://tanstack.com/table/latest)

I kan finde projektet her: [https://github.com/andreaskjensen/React-Front-End](https://github.com/andreaskjensen/React-Front-End)

