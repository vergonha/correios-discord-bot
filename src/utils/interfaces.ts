
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
    servico: string | undefined,
    host: string | undefined,
    quantidade: number | undefined,
    eventos: iEvento[],
    time: number,
    ultimo: string
}