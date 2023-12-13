
// "Evento" means "Event" in portuguese.
export interface iEvento {
    data: string,
    hora: string,
    local: string,
    status: string,
    subStatus: string[]
}

// "Rastreio" means "Tracking" in portuguese.
export interface iRastreio {
    codigo: string,
    servico?: string | undefined,
    host?: string | undefined,
    quantidade?: number | undefined,
    eventos: iEvento[],
    time: number,
    ultimo?: string | undefined
}

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
