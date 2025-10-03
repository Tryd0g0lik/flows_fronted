
interface ErrorSource {
    getClassName(): string;
    getMethodName(): string,
};

class ErrorSourceName implements ErrorSource{
    private readonly error: Error;
    private readonly parentCaonstructor: Function;

    constructor(error: Error, parentClass: Function) {
        /**
         * This class for working with the error cource. When us need to get
         * the class name and method name for publishing to the log or throw error.
         * @error - Error object;
         * @parentClass - Class;
         */
        this.error = error;
        this.parentCaonstructor = parentClass.constructor;
    }

    getClassName() {
        /**
         * This method for getting the class name to the string view.
         * @returns - string.
         */
        return this.constructor.name;
    }
    getMethodName() {
        /**
         * This method for getting the method name to the string view.
         * @returns - string.
         */
        const stackLines = (this.error as Error).stack?.split('\n') as string[];
        return (stackLines).length >= 3 ? stackLines[2].trim() : '';
    }
}

export default ErrorSourceName;
