module.exports = (mongoose) => {
    const User = mongoose.model(
        'user',
        mongoose.Schema(
            {
                firstName:String,
                lastName:String,
                DOB: Date,
                email: String,
                age: Number
            },
            {timestaps: true}
        )
    )
    return User;
}