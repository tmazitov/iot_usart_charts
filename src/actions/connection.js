class connection {

    static buffer = []

    static osSuccess(uint8_tArray) {
        for (let charIndex = 0; charIndex < uint8_tArray.length; charIndex++){
            let code = uint8_tArray[charIndex]
            let char = String.fromCharCode(code)
            if (char != "|"){
                this.buffer.push(char)
                continue
            }

            // if char is "|" - splitter
            let newValue = Number(this.buffer.join(""))

            if (this.buffer.length > 0){
                console.log('STM32_UART content : ', newValue)
                this.buffer = []
                return newValue
            }
        }
    }

    static onError(error) {
        console.log('STM32_UART error : ', error)
    }
}

export default connection