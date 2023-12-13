class ServicoIndisponivelException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "ServicoIndisponivelException";
    }
}

export default ServicoIndisponivelException;
