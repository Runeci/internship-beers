export interface Beer {
    id: number,
    name: string,
    tagline: string,
    first_brewed: string,
    description: string,
    image_url: string,
    abv: number,
    ibu: number,
    target_fg: number,
    target_og: number,
    ebc: number,
    srm: number,
    ph: number,
    attenuation_level: number,
    volume: BeerMeasurement,
    boil_volume: BeerMeasurement,
    method: BeerMethod,
    ingredients: BeerIngredients,
    food_pairing: string[],
    brewers_tips: string,
    contributed_by: string,
}

type BeerMeasurement = {
    value: number,
    unit: string,
}

type BeerMethod = {
    mash_temp: {
        temp: BeerMeasurement,
        duration: number,
    }[],
    fermentation: {
        temp: BeerMeasurement,
    },
    twist: null,
}

type BeerIngredients = {
    ingredient: Record<string, BeerIngredient>[],
    yeast: string,
}

type BeerIngredient = {
    name: string,
    amount: BeerMeasurement,
    add?: string,
    attribute?: string,
}
