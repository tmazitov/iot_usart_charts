class Stack {
    
    constructor(count){
        this.count = count
        this.array = []
    }
    add(value){
        if (this.array.length != this.count){
            this.array.push(value)
            return
        }

        this.array.shift()
        this.array.push(value)
    }
    range(){
        return this.array
    }
    
    middle(){
        let sum = 0

        this.array.forEach(elem => {
            sum += elem
        })

        return (sum / this.array.length).toFixed(2) 
    }
    max(){
        let max = 0
        
        this.array.forEach(elem => {
            if (elem > max) max = elem
        })

        return max
    }

    min(){
        let min = 4096
        
        this.array.forEach(elem => {
            if (elem < min) min = elem
        })

        return min
    }
}

export default Stack