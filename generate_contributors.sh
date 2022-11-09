echo 'import { Contributor } from "@site/data/Contributors.interface";    

export const contributors: Contributor[] = ' > data/contributors.ts

gh api repos/wadhah101/insat-gl-knowledge/contributors >>  data/contributors.ts
