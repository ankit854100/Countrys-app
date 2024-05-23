interface ICard {
    name: string,
    population: number,
    region: string,
    capital: string,
    src: string
    onCardClick: (values: any) => void
}

interface ICountryDetails {
    commonName: string,
    nativeName: string,
    population: number,
    region: string,
    subRegion: string,
    capital: string,
    topLevelDomain: string,
    currencies: string,
    languages: any[],
    image: string
}

interface ICountryContainerProps {
    name: string,
    backNavigation: () => void
}

interface ICustomTypography {
    name: string,
    value: string | number | string[]
}

interface ICardContainerProps {
    isFetching: boolean,
    countries: any[],
    onCardClick: (values: any) => void
}

interface ISubHeaderProps {
    fetchCountriesByRegion: (value: string) => void,
    setCountriesFromSearch: (value: any[]) => void,
    setIsFetching: (value: boolean) => void
}

interface ISearchBarProps {
    setCountriesFromSearch: (value: any[]) => void,
    setIsFetching: (value: boolean) => void
}

interface IFilterProps {
    fetchCountriesByRegion: (value: string) => void
}

export type {
    ICard,
    ICountryDetails,
    ICustomTypography,
    ICardContainerProps,
    ICountryContainerProps,
    ISubHeaderProps,
    ISearchBarProps,
    IFilterProps
}