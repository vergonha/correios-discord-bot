class PacoteInvalidoException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "PacoteInvalidoException";
    }
}

export default PacoteInvalidoException;
