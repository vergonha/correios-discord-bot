export interface iMagaluResponse {
    data: Data[]
}

export interface Data {
    type: string
    status: string
    date: string
    hour: string
    description: string
    detail: any
    recipient: any
    document: any
    comment: any
    locale: string
    code: any
    city: string
    state: string
    destinations: Destination[]
    address: any
}

export interface Destination {
    locale: string
    code: string
    city: string
    district: any
    state: string
}
