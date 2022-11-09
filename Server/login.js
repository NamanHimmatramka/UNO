class Login{

    constructor(jwt, bcrypt){
        this.jwt = jwt
        this.bcrypt = bcrypt
    }

    issueJWT(user){
        const _id = user._id
        const expiresIn = '1D'
        const payload = {
            sub: _id,
            iat: Date.now()
        }
        const signedToken = this.jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: expiresIn})
        return {
            token:"Bearer "+signedToken,
            expires: expiresIn
        }
    }

    checkPassword(password, toCheck){
        const isValid = this.bcrypt.compare(toCheck, password)
        return isValid
    }

    async createSalt(){
        const salt = await this.bcrypt.genSalt(10)
        return salt
    }

    async createPassword(password, salt){
        const hashedPassword = await this.bcrypt.hash(password,salt)
        return hashedPassword
    }
}

module.exports = Login